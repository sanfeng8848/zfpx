const EventEmitter = require('events')
const fs = require('fs')

class ReadStream extends EventEmitter {
  constructor (path, opts) {
    super(path, opts)
    this.path = path
    this.flags = opts.flags || 'r'
    this.mode = opts.mode || 0o666
    this.encoding = opts.encoding      // 不需要默认值, 如果不需要转码, 只需要buffer的话, 是不需要转码的
    this.highWaterMark = opts.highWaterMark || 64 * 1024
    this.start = opts.start || 0
    this.end = opts.end  // 不给默认值就读到文件末尾
    this.pos = this.start  // 文件位置, 会不断变化
    // 区分可读流的两种模式(源码是使用一个变量flowing),也不是true, 也不是false 不是流动模式, 是暂停模式
    this.flowing = null
    // buffer不是缓存, 只是存储固定大小的存储数据的数组
    this.buffer = Buffer.alloc(this.highWaterMark)
    this.open()       // 准备打开文件读取数据
    // 如果当前实例被添加了任意的监听函数, 就会触发newListener事件
    this.on('newListener', (type, listener) => {
      if (type === 'data') {
        // 如果监听了data事件, 流会自动切换到流动模式
        this.flowing = true
        this.read()   // 读文件
      }
    })
  }
  // 读一块,发射一块, 不走缓存, 需要加判断, 因为构造函数中open()是异步的, read中要判断是否已经打开了
  read () {
    if (typeof this.fd != 'number') {
      //此处必须注意的是要有return, 没有return就会继续向下执行, 所以当fs.read()中的this.fd就是undefined
      return this.once('open', () => this.read())  // 不用每次打开文件都执行read，
    }
    let howMuchToRead = this.end ? 
      Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark
    // console.log(howMuchToRead);
    // bytes是实际读到的字节数
    fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, bytes) => {
      if (err) {
        if (this.autoClose) {
          this.destroy()
        }
        return this.emit('error', err)
      }
      if (bytes) {
        // 从缓冲区截取读到的字节数, 因为当读到的字节数小于缓冲区的length, 就不需要发送整个缓冲区的大小了
        let data = this.buffer.slice(0, bytes)
        // 读取一段字节数bytes, 文件指针就向后移动响应的字节数
        this.pos += bytes
        console.log("---->", this.pos, this.end)
        // 根据encoding转换不同的字符集编码, 没有就默认使用buffer, 并发射取出, 供实例监听data事件, 接受data数据进行消费
        data = this.encoding ? data.toString(this.encoding) : data
        this.emit('data', data)
        // flow流动模式是读一块写一块, 不暂停, 那么什么时候就读read完了呢?
        // 判断: 如果读到了末尾(即参数中给出了this.end) 并且末尾位置大于文件读取指针位置
        if (this.end && this.pos > this.end) {
          this.endFn()          
          // 读完了(越界了, 读的少, 设置读取的位置很大), 发射end事件, 实例对象监听end事件即可
          // this.emit('end', '设置读取字节超出文件大小, 读取完毕')
          // return this.destroy()
        } else {
          // 没有读到结尾或者指定的this.end的位置, 就继续读文件, 将数据放入缓冲区
          // 如果 可读流是流动模式, 才读数据
          if (this.flowing) {
            this.read()
          }
        }
      } else {
        // 当没有再读取到字节数
        this.endFn()
        // this.emit('end', '文件正常读取完毕')
        // return this.destroy()
      }
    })
  }
  // 封装文件读取完成的操作, 1. 发射end事件 2. 关闭文件
  endFn () {
    this.emit('end')
    this.destroy()
  }

  open () {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      //比如文件不存在
      if (err) {
        if (this.autoClose) {
          this.destroy()
        }
        return this.emit('error', err)
      }
      this.fd = fd
      this.emit('open')
    })
  }

  destroy () {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
  // 暂停模式, 监听data事件, 
  pipe (dest) {
    this.on('data', data => {
      // 向可写流的缓冲区写入buffer数据
      let flag = dest.write(data)
      // 当写入流的缓冲区已满, 暂停可读流的读取, 同时监听可写流的drain事件
      if (!flag) {
        this.pause()
      }
    })
    dest.on('drain', () => {
      this.resume()
    })
  }

  // 
  pause () {
    this.flowing = false
  }

  resume () {
    this.flowing = true
    // 接着读
    this.read()
  }
}

module.exports = ReadStream;