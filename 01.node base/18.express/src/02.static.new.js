const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

// 静态资源中间件
function static(root, options = {}) {
  let { dotfiles = 'ignore', etag = true, lastModified = true, maxAge = 0, setHeaders } = options
  return function (req, res, next) {
    let { pathname } = url.parse(req.url, true)
    let filepath = path.join(root, pathname)
    let parts = filepath.split(path.sep)    // 根据路径分隔符分隔
    let isDotFile = parts[parts.length - 1].startsWith('.')
    // 源码是返回状态码403 无权访问的错误, 可以直接调用next
    // 隐藏文件的判断
    if (isDotFile && dotfiles == 'deny') {
      // next()
      res.setHeader('Content-Type', 'text/html')
      res.statusCode = 403  // 无权访问
      res.end(http.STATUS_CODES[403])
    }
    fs.stat(filepath, (err, stat) => {
      if (err) {
        next()
      } else {
        let contentType = mime.getType(pathname)
        res.setHeader('Content-Type', contentType)
        // 缓存
        if (etag) {
          res.setHeader('Etag', stat.mtime.toLocaleDateString())
        }
        if (lastModified) {
          res.setHeader('Last-Modified', stat.mtime.toUTCString())
        }
        res.setHeader('Cache-Control', `max-age=${maxAge}`)
        if (setHeaders) {
          setHeaders(req, res, function () {
            fs.createReadStream(filepath).pipe(res)
          })
        }
      }
    })
  }
}

module.exports = static;

