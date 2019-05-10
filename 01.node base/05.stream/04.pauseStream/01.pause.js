/**
 * 暂停流, 在真实情况下, 当可读流创建后会立刻进入暂停模式.
 * 然后会立刻填充缓存区, 缓存区的大小是可以看到的 rs._readableState.length
 */
/**
 * 1. 当创建了流之后, 无论是否读取自己, 都会填冲缓冲区, 初始就是highWaterMark个字节
 * 2. 当开始从缓冲区读取字节时,也就是消费掉了一个字节之后, 缓冲区就变成了2个字节
 * 3. 当操作系统底层发现缓冲区的字节数小于highWaterMark, 则会再次读取highWaterMark个字节填充缓冲区
 */
const fs = require('fs')
const path = require('path')
const ReadStreamPause = require('./02.ReadStreamPause')

let myPath = path.join(__dirname, '../data/3.txt')
console.log(myPath)

let rs = new ReadStreamPause(myPath, {
  highWaterMark: 3,
  encoding: 'utf8'
})

rs.on('readable', () => {
  console.log(rs.length)
  let char = rs.read(1)
  console.log(char);
  console.log(rs.length);
  setTimeout(() => {
    console.log(rs.length);
  }, 500)
})
// let rs = fs.createReadStream(path.join(__dirname, '..', 'data/3.txt'), {
//   highWaterMark: 3
// })

// // 当监听readable事件时, 流切换到暂停模式
// rs.on('readable', () => {
//   console.log(rs._readableState.length);
// })

// rs.on('readable', () => {
//   console.log(rs._readableState.length);    // 3
//   let char = rs.read(1)
//   console.log(char.toString())
//   console.log(rs._readableState.length);    // 2
//   setTimeout(() => {
//     console.log(rs._readableState.length);  // 5
//   },500)
// })