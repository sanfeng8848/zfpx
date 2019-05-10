/*
* 原生的写法 使用node api
* */

// 1. 创建可写流
// 2. 设置可写流的参数 highWaterMark
// 3. 当写入缓冲区返回true 并且 满足条件时, 一直循环写入缓冲区

const fs = require('fs')
let ws = fs.createWriteStream('./1.txt', {
  flags: 'w',
  mode: 0o666,
  start: 0,
  encoding: 'utf8',
  autoClose: true,
  highWaterMark: 3
})

let number = 10

function write () {
  let flag = true
  while (flag && number > 0) {
    flag = ws.write(number+"")
    number--
    console.log(flag)
  }
  ws.once('drain', () => {
    console.log('drain')
    flag = true
    write()
  })
}
write()


