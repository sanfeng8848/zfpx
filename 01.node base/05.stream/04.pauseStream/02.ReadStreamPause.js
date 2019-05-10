const fs = require('fs')
const EventEmitter = require('events')



class ReadStreamPause extends EventEmitter {
  constructor (path, opts) {
    super(path, opts)
    this.path = path
    this.flags = opts.flags || 'r'
    this.mode = opts.mode || 0o666
    this.start = opts.start || 0
    this.encoding = opts.encoding || 'utf8'
    this.highWaterMark = opts.highWaterMark || 1024 * 64
    // buffer不是缓存, 只是存储固定大小的存储数据的数组
    this.buffer = Buffer.alloc(this.highWaterMark)
    // buffers才是真正的缓存, 缓存是可变大小的, 底层使用链表, 本例使用数组
    this.buffers = []
    // 维护缓冲区的大小的冗余字段, this.length = buffers的总长度
    this.length = 0       
    this.open()
  }
  // 打开文件
  open () {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        if (this.autoClose) {
          this.destroy()
        }
        return this.emit('error', err)
      }
      this.fd = fd;
      this.emit('open')
      // 区别: 暂停流, 打开文件就先读取highWaterMark个字节
      this.read()
    })
  }

  read (n) {
    // 参数n的大小是有讲究
    // 缓存区数据足够用, 并且要读取的字节大小大于0, 说明想要读取的自己大小n, 完全可以从缓冲区里直接拿就可以满足
    let ret;
    if (0 < n < this.length) {
      ret = Buffer.alloc(n)
      let index = 0
      let b;
      // 从缓冲区挨个拿出每一个buffer,然后把每个buffer的每个字节挨个复制给ret
      // 如果
      while (null != (b = this.buffers.shift())) {
        for (let i = 0; i < b.length; i++) {
          ret[index++] = b[i]
          // 当下标等于需要填充的字节数时, 填充完毕; 但是有可能b这个buffer(buffers缓冲区中的一个buffer)没有用完
          // 把没有用完的字节放回缓冲区buffers, 需要截取b.slice(i)
          if (index == n) {
            b = b.slice(i)  // 如果读取的字节数正好在缓冲区的某个
            this.buffers.unshift(b);  // 放回缓冲区
            this.length -= n;   // 读了n个字节, 缓冲区的长度就减少n个字节长度
            break;   // 
          }
        }
      }
    }
    // 如果缓存区的大小 小于了 最高水位线了, 就重新读取highWaterMark个字节(如果读取的自己足够多)
    if (this.length < this.highWaterMark) {
      // buffer 是数据将写入的缓冲区(不是真正的缓冲区, 固定大小的存放数据的数组而已)
      fs.read(this.fd, this.buffer, 0, this.highWaterMark, null, (err, bytesRead) => {
        // TODO 错误处理
        if (bytesRead) {  // bytesRead: 读到的字节数
          // 如果读到数据了, 从存放自己的buffer容器中截取所读到的字节
          let b = this.buffer.slice(0, bytesRead)
          // 将读到的字节放入缓冲区
          this.buffers.push(b)
          // 让缓冲区的数量 + 实际读到的字节数
          this.length += bytesRead
          // 已经读完了highWaterMark个字节, 并且填充了缓冲区, 要通知实例进行消费数据
          // 发射readable事件
          this.emit('readable')
        } else {
          // 没有读到数据
          return this.emit('end')
        }
      })
    }
    return ret && this.encoding ? ret.toString(this.encoding) : ret;
  }
}

module.exports = ReadStreamPause

