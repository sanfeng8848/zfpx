let str = '珠峰'
let fs = require('fs')

fs.open('./data/write.txt', 'w', 0o666, (err, fd) => {
  let buff = Buffer.from(str);
  // 当我们调用write方法写入文件的时候, 并不会直接写入物理文件, 而是会先写入缓冲区, 再批量写入物理文件
  fs.write(fd, buff, 0, 3, null, (err, bytesWritten) => {
    console.log(bytesWritten)
    fs.write(fd, buff, 3, 3, null, (err, bytesWritten) => {
      // console.log(bytesWritten)
      // 迫使操作系统立刻马上把缓冲区的内容写入文理文件
      fs.fsync(fd, () => {
        console.log('关闭文件完成')
      })
    })
  })
})