let express = require('express')

// static用到的模块
let path = require('path')
let url = require('url')
let fs = require('fs')
let mime = require('mime')

let app = express()


app.use(static(path.join(__dirname, 'public'), {
  maxAge: 30 * 1000,
  etag: true,
  lastModified: true,
  setHeaders: function (req, res, callback) {
    res.setHeader('hello', 'world')
    callback()
  }
}))
app.listen(8080)


function static (root, options = {}) {
  let { dotfiles = 'ignore', etag = true, lastModified = true, maxAge = 0, setHeaders  } = options;
  return function (req, res, next) {
    let { pathname } = url.parse(req.url, true)
    let file = path.join(root, pathname)
    let parts = file.split(path.sep)
    let isDotFile = parts[parts.length - 1][0] == '.'
    if (isDotFile && dotfiles == 'deny') {
      res.setHeader('Content-Type', 'text/html')
      res.statusCode = 403
      return res.end(http.STATUS_CODES[403])
    }
    fs.stat(file, (err, stat) => {
      // 找不到文件,说明请求的不是静态文件,可能是路由或者中间件
      if (err) {
        next()  
      } else {
        let contentType = mime.getType(pathname)
        res.setHeader('Content-Type', contentType)
        // 如果配置参数有对响应头做了设置,使用之
        if (etag) {
          res.setHeader('Etag', stat.mtime.toLocaleDateString())
        }
        if (lastModified) {
          res.setHeader('Last-Modified', stat.mtime.toUTCString())
        }
        res.setHeader('Cache-Control', `max-age=${maxAge}`)
        if (setHeaders) {
          // options中的setHeaders函数的配置自定义的响应头
          setHeaders(req, res, () => {
            fs.createReadStream(file).pipe(res)
          })
        }
      }
    })
  }
}