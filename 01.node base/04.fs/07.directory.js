let path = require('path')
let fs = require('fs')

// //获取一个目录下面的所有文件或目录
// fs.readdir()
//
// // 删除一个文件
// fs.unlink(path)
//
// // 删除一个空目录
// fs.rmdir('a/b/c')

/**
 * 递归删除非空目录(异步)
 */

function rmdirp(dir) {
  let files = fs.readdirSync(dir)
  files.forEach(function (file) {
    let current = dir + '/' + file;
    //判断file是目录还是文件
    let child = fs.statSync(current)
    if (child.isDirectory()) {
      rmdirp(current)
    } else {
      fs.unlinkSync(current)
    }
  })
  // 把一个指定的目录下面的所有文件或者目录删除之后, 也要把自己删除
  fs.rmdirSync(dir)
}

rmdirp('a')