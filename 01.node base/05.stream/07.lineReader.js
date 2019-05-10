/**
 * 实现一个类: 
 * 1. 然后传入一个文件路径得到类的实例
 * 2. 类的实例可以监听newLine事件, 当这个行读取器每次读到一行的时候, 就会向外发生newLine事件
 * 3. 当读到结束的时候 发射end事件
 * 
 */

const EventEmitter = require('events')
const util = require('util')
const fs = require('fs')

const NEW_LINE = 0x0A   // \n  新行 换行
const RETURN = 0x0D     // \r  回车

module.exports = LineReader;

function LineReader (path, encoding) {
  EventEmitter.call(this)
  // 通过传进来的路径创建可读流
  this._reader = fs.createReadStream(path)
  this.encoding = encoding || 'utf8'
  // 当给一个对象添加一个新的监听函数的时候触发newListener事件
  this.on('newListener', (type, listener) => {
    // 如果添加了newLine的监听, 那么就开始读取文件内容并按行发射数据
    if (type === 'newLine') {
      // 缓冲区
      let buffers = []  
      // 当监听了一个可读流的readable的事件, 流会调用底层的读取文件的API方法填充缓冲区, 填充完之后向外发射readable事件
      this._reader.on('readable', () => {
        // 触发了readable: 说明缓冲器已经填满了, 就开始读了
        let char; // Buffer 是一个只有一个字节的buffer
        while (null != (char = this._reader.read(1))) {   // 读取一个字节
          switch (char[0]) {
            // 换行 \n
            case NEW_LINE:
              this.emit('newLine', Buffer.from(buffers).toString(this.encoding))
              break;
            // 回车 \r
            case RETURN:
              // 遇到\r, 无论是\r, 还是\r\n, 说明本行已经肯定结束了, 只是需要多读一个字节判断多读的字节是否是\n
              // 所以直接发射 newLine事件, 把buffer传递出去
              // 1. 发射newLine事件, 并传递buffer数组(传递一个字节数组来创建buffer)
              this.emit('newLine', Buffer.from(buffers).toString(this.encoding))

              // 2. 清空缓冲区 即: 对buffers数组的length 设置为0
              buffers.length = 0

              // 3. 多读一个字节, 如果不是换行, 说明是下一行的内容, 如果是换行, 什么都不用做, 抛弃这个字节即可
              let nChar = this._reader.read(1)

              // 4. 不是\n, 说明是下一行的开始的第一个字节, 将这个字节追加进缓冲区
              if (nChar[0] != NEW_LINE) {
                buffers.push(nChar[0])
              }
              break;
            // 不是换行和回车的情况, 将字节追加到缓冲区
            default:
              buffers.push(char[0])
              break;
          }
        }
      })
      // end事件时, 还有数据在缓冲区里面, 发射事件即可
      this._reader.on('end', () => {
        this.emit('newLine', Buffer.from(buffers).toString(this.encoding))
        this.emit('end')    // 发射end事件, 用于类的实例可以监听end事件
      })
    }
  })
}

util.inherits(LineReader, EventEmitter)