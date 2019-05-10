const fs = require('fs')
const path = require('path')
/**
 * 删除文件 fs.unlink
 * 目录：fs.rmdir   这一定是一个空目录
 * */

// 异步递归 删除非空文件夹
function rmdir (dir) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stat) => {
      if (err) return reject(err)
      if (stat.isDirectory()) {
        fs.readdir(dir, (err, files) => {
          if (err) return reject(err)
          // 先删除当前目录的子文件夹或文件, 再删除自己
          Promise.all(files.map(item => rmdir(path.join(dir, item))))       // 递归删除子文件夹
            .then(() => {
              fs.rmdir(dir, resolve)                                        // 子文件夹删除成功后, 成功的回调再删除自己
            })
        })
      } else {
        fs.unlink(dir, () => {
          console.log('文件删除成功')
        })
      }
    })
  })
}



// function rmdir (dir) {
//   return new Promise((resolve, reject) => {
//
//     // 获取dir目录下的所有文件或者文件夹
//     fs.readdir(dir, (err, files) => {
//       // 先删除当前目录的子文件夹或文件, 再删除自己
//       Promise.all()
//     })
//
//   })
// }

rmdir('a').then(data => {
  console.log(data)
}, err => {
  console.error(err)
})


// 同步写法
// function rmdirSync (dir) {
//   let files = fs.readdirSync(dir)
//   files.forEach(file => {
//     // 目录+文件名 拼接成一个真正的目录
//     let filePath = path.join(dir, file)
//     let fileStat = fs.statSync(filePath)
//     if (fileStat.isDirectory()) {
//       rmdirSync(filePath)
//     } else {
//       fs.unlinkSync(filePath)
//     }
//   })
//   fs.rmdirSync(dir)
// }
//
// rmdirSync('./a')


