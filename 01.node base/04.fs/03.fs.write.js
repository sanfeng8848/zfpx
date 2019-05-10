const fs = require('fs')

fs.open('./data/2.txt', 'w', 0o666, (err, fd) => {
  if (err) {
    throw err;
  }
  console.log('文件打开成功并开始写入buffer')
  // console.log(fd);
  fs.write(fd, Buffer.from('刘志成'), 0, 3, 0, function (err, bytesWritten) {
    console.log(bytesWritten)
  })
  fs.close(fd, () => {})
})