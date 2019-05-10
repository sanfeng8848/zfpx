const fs = require('fs')
// 当创建一个目录的时候，必须要求父目录是存在的
// fs.mkdir('a/b', err => {
//   console.log(err)
// })
//

// 判断一个文件或目录 是否存在
// fs.access('a', fs.constants.R_OK, err => {
//   console.log(err)
// })


// 递归异步创建目录
function mkdirp (dir) {
  let paths = dir.split('/')  // [a,b,c]
  console.log(paths)
  !function next (index) {
    if (index > paths.length) return;
    let current = paths.slice(0, index).join('/')
    console.log("current --> ", current)
    fs.access(current, fs.constants.R_OK, err => {
      if (err) {
        fs.mkdir(current, 0o666, () => { next.call(null, index + 1) })
        // fs.mkdir(current, 0o666, () => next(index+1))
      } else {
        next(index + 1)
      }
    })
  }(1);
}

mkdirp('a/b/c')