/**
 * 流动模式, 没有暂停，
 * 尽快的读取, 尽快的发射, 不走缓存
 */

// const fs = require('fs')
// let rs = fs.createReadStream('../data/3.txt', {
//   flags: 'r',
//   mode: 0o666,
//   start: 3,
//   end: 7,
//   // encoding: 'utf8',
//   highWaterMark: 3,
//   autoClose: true
// })

// rs.on('open', () => {
//   console.log('open')
// })

// rs.on('data', (chunk) => {
//   console.log(chunk)
// })

// rs.on('end', () => {
//   console.log('read end')
// })

// rs.on('close', () => {
//   console.log('file close')
// })

// rs.on('error', (err) => {
//   console.error(err)
// })



/**
 * 20190313 再写一次
 * 
 */

const fs = require('fs')
const path = require('path')

let rs = fs.createReadStream(path.join(__dirname, '../data/2.txt'), {
  flags: 'r',
  highWaterMark: 3,
  encoding: 'utf8'
})

rs.on('open', () => {
  console.log('open');
})
rs.on('close', () => {
  console.log('close');
})
rs.on('error', err => {
  console.log(err);
})
rs.on('data', data => {
  console.log(data)
})
rs.on('finish', () => {
  console.log('finished');
})
