/**
 * 流动模式不缓存, 直接发射, 然后读取下次的数据, 如果用流动模式, 而且没有消费, 数据㐇拜拜丢失了
 */

const fs = require('fs')
const path = require('path')

let rs = fs.createReadStream(path.join(__dirname, './data/1.txt'), {
  highWaterMark: 3
})

// 监听data事件, 流动模式
/*rs.on('data', function (data) {
  console.log(data)
})

rs.on('end', function () {
  console.log('end');
})*/

// 当监听readable事件的时候, 会进入暂停模式
// 可读流会马上向底层读取文件, 然后会把读到文件的数据放在缓存区里
// self.read(0): 只填充缓存, 但是不会发射data事件, 但是会发射readable事件,stream.emit('readable')
// Readable.prototype.read: fn --> this._read(state.highWaterMark);
rs.on('readable', function () {
  // length: 就是缓存区数据的大小
  // 可读流的属性都保存在了 _readableState
  // state.length += chunk.length; 3
  console.log(rs._readableState.length)
  // read 不加参数表示读取整个缓存区数据
  // 如果希望读取的字节大小 小于等于 缓存区字节大小  则直接返回
  let ch = rs.read(1)     // 返回第一个字节
  console.log(ch)

  console.log(rs._readableState.length)
  ch = rs.read(1)
  console.log(ch)
  console.log(rs._readableState.length)

  // 当你读完指定的字节后，如果可读流发现剩下的字节已经比最高水位线小了, 则会立刻再次读取填满 最高水位线
  // 缓存大小是没有限制的,缓存区是个链表, 源码: state.buffer.push(chunk)
})