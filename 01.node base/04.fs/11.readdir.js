let fs = require('fs')
let path = require('path')


fs.readdir('./data', function (err, files) {
  console.log(files)
  files.forEach(function (file) {
    let child = path.join('data', file)
    fs.stat(child,  (err,  stat) => {
      console.log(stat);
    })
  })
})