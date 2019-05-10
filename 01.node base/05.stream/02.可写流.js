/**
 * 可写流: 当你往可写流里写数据的时候，不会立刻写入文件，而是写入缓冲区，缓冲区大小是highWaterMark
 * 默认值是16k，然后等缓冲区满了之后才写入文件里
 * 缓冲区: buffer的链表(头尾指针)
 * */

let fs = require('fs')

let ws = fs.createWriteStream('./data/2.txt', {
  flags: 'w',
  mode: 0o666,
  start: 0,
  highWaterMark: 3
})
// 缓存区满了，返回false，没满，返回true

// 即使缓冲区已经写满了, 即返回false了, 数据也不会丢失, 数据会缓存在内存里,
// 等缓存区的数据清空之后, 再从内存中读出来, 然后再从缓冲区写入文件
let flag = ws.write("1")
console.log(flag);
flag = ws.write("2")
console.log(flag);
flag = ws.write("3")
console.log(flag);
flag = ws.write("4")
console.log(flag);
flag = ws.write("5")
console.log(flag);



/**
 * true
 true
 false
 false
 false
 */
