const path = require('path')
let fs = require('fs')

// 返回高阶函数, 入参是路径
module.exports = function (pathDir) {
  // 函数的执行返回一个async fn, 也就是中间件的模式, 函数中包裹着异步操作
  return async (ctx, next) => {

    let localFilePath = path.join(pathDir, ctx.path)
    let _err = null;
    await new Promise((resolve, reject) => {
      fs.stat(localFilePath, (err, stat) => {
        if (err) {
          _err = err;
        } else {
          if (stat.isFile) {
            let index = localFilePath.lastIndexOf('.')
            let ext = localFilePath.substr(index + 1)
            switch (ext) {
              case 'html':
                ctx.res.setHeader('Content-Type', 'text/html; charset=utf-8')
                break;
              case 'css':
                ctx.res.setHeader('Content-Type', 'text/css; charset=utf-8')
                break;
              case 'js':
                ctx.res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
                break;
            }
            
            // 返回的是个可读流即可
            ctx.body = fs.createReadStream(localFilePath)
            resolve()
          } else {
            next()
          }
        }
      })
    })
    if (_err) {
      return next()
    }
  }
}