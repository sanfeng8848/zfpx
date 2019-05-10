let fs = require('fs')

fs.open('./data/4.txt', 'w', 0o666, (err, fd) => {
  fs.write(fd, Buffer.from('a'), 0, 1, null, function (err, bytesWritten) {
    console.log(bytesWritten)
    fs.fsync(fd, function (err) {
      fs.close(fd, function () {
        console.log('关闭')
      })
    })

  })
})

