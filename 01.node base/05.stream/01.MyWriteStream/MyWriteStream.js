// 创建一个类, 实现write方法
const fs = require('fs')
const EventEmitter = require('events')

class WriteStream extends EventEmitter {
  constructor (path, opts) {
    super(path, opts)
    this.path = path
    this.flags = opts.flags || 'w'
    this.mode = opts.mode || 0o666
    this.encoding = opts.encoding || 'utf8'
    this.autoClose = opts.autoClose || true
    this.highWaterMark = opts.highWaterMark || 1024 * 16
    this.start = opts.start || 0
    this.pos = this.start
    // 缓冲区
    this.buffers = []
    this.length = 0
    // 底层是否正在将缓冲区的数据写入文件
    this.writing = false
    // 实例化的唯一操作, 打开文件
    this.open()
  }

  // 欲先写入文件, 先要打开文件, 才能允许buffers中的字节写入其中
  open () {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        if (this.autoClose) {
          this.destroy()
        } else {
          return this.emit('error', err)
        }
      }
      console.log('文件打开')
      this.fd = fd
      return this.emit('open')   // 发射open事件, 当write时要监听这个open事件, 监听到了,才能写入文件
    })
  }

  // 可写流的写入缓冲区 或者 调用底层方法写入文件
  write (chunk, encoding, cb) {
    // 对chunk进行转化
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding)
    let len = chunk.length
    this.length += len;
    // 判断当前最新的缓冲区是否小于highWaterMark
    let ret = this.length < this.highWaterMark
    // 如果正在写入文件, 把写入的数据包装成对象,写入缓冲区
    if (this.writing) {
      this.buffers.push({
        chunk,
        encoding,
        cb
      })
    } else {
      this.writing = true;  //
      this._write(chunk, encoding, () => this.clearBuffer())    // 底层写入文件之后清空缓冲区操作
    }
    return ret;
  }

  // 缓冲区的数据写入到文件后, 要把写入的缓冲区清空
  clearBuffer () {
    let data = this.buffers.shift()
    // 如果缓冲区还有数据
    if (data) {
      this._write(data.chunk, data.encoding, () => this.clearBuffer())
    } else {
      // 缓冲区没有数据了, 清空了之后, 就不是写入状态 所以this.writing = false
      this.writing = false
      this.emit('drain')    // 发射drain, 可以继续填充缓冲区进行写入
    }
  }

  // 真实的将缓存区的数据写入到文件
  _write (chunk, encoding, cb) {
    // 文件句柄不是number类型说明还没有打开文件, 监听文件打开事件, 才调用_write函数
    if (typeof this.fd != 'number') {
      return this.once('open', () => this._write(chunk, encoding, cb))
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, bytesWritten) => {
      if (err) {
        if (this.autoClose) {
          this.destroy()
          this.emit('error', err)
        }
      }
      this.pos += bytesWritten
      this.length -= bytesWritten
      cb && cb()
    })
  }

  destroy () {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
}

module.exports = WriteStream;






