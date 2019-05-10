// 为了实现节约内存的copy, 读一点写一点, 要实现异步, 使用递归

// !function next () {}() 函数声明之前使用!或者+,-可以将函数声明转换为表达式, 然后后面加(), 就是调用了
// ! 和 (function(){})() 中前面的() 一个意思

let fs = require('fs')

const BUFFER_SIZE = 3;    // 缓存大小3个字节

function copy (src, target) {
  fs.open(src, 'r', 0o666, (err, readFd) => {
    fs.open(target, 'w', 0o666, (err, writeFd) => {
      let buff = Buffer.alloc(BUFFER_SIZE)
      !function next () {
        fs.read(readFd, buff, 0, BUFFER_SIZE, null, (err, bytesRead, buff) => {
          if (bytesRead > 0)
            fs.write(writeFd, buff, 0, bytesRead, null, next)
        })
      }()
    })
  })
}

copy('./data/1.txt', './data/3.txt')
