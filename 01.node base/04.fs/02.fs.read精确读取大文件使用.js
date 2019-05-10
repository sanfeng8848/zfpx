const fs = require('fs')

/*
r ：读取文件，文件不存在时报错；
r+ ：读取并写入文件，文件不存在时报错；
rs ：以同步方式读取文件，文件不存在时报错；
rs+ ：以同步方式读取并写入文件，文件不存在时报错；
w ：写入文件，文件不存在则创建，存在则清空；
wx ：和w一样，但是文件存在时会报错；
w+ ：读取并写入文件，文件不存在则创建，存在则清空；
wx+ ：和w+一样，但是文件存在时会报错；
a ：以追加方式写入文件，文件不存在则创建；
ax ：和a一样，但是文件存在时会报错；
a+ ：读取并追加写入文件，文件不存在则创建；
ax+ ：和a+一样，但是文件存在时会报错。
*/

fs.open('./data/1.txt', 'r', 0o666, function (err, fd) {
  if (err) {
    throw err
  }
  console.log('打开文件成功!')
  let buffer = Buffer.alloc(3)      // buffer缓冲区, 二进制数
  // postion: null表示当前位置, 每次读取文件都有个文件指针, 读取到哪里了, 指针就指向哪里
  // 默认初始为0
  fs.read(fd, buffer, 0, 3, null, function (err, bytesRead, buffer) {
    if (err) {
      throw err
    }
    // console.log(bytesRead)    读取的字节数量
    // console.log(bytesRead, buffer.slice(0, bytesRead).toString())
    console.log(buffer.toString())   // 012
    fs.read(fd, buffer, 0, 3, null, function (err, bytesRead, buffer) {
      console.log(buffer.toString())    // 345
    })
    // 关闭文件
    fs.close(fd, () => {
      console.log('file is closed')
    })
  })
})