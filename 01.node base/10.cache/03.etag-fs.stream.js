let http = require('http')
let fs = require('fs')
let crypto = require('crypto')
let url = require('url')
let path = require('path')
let mime = require('mime')


http.createServer((req, res) => {
  let { pathname } = url.parse(req.url, true)
  let filepath = path.join(__dirname, pathname)
  fs.stat(filepath, (err, stat) => {
    if (err) {
      sendError(req, res);
    } else {
      // 获取请求头关于etag的字段信息
      let ifNoneMatch = req.headers['if-none-match']
      // 计算在服务器端该资源的etag标识, 使用流
      let rs = fs.createReadStream(filepath)
      let md5 = crypto.createHash('md5')
      rs.on('data', (data) => {
        md5.update(data)
      })
      rs.on('end', () => {
        let etag = md5.digest('hex')
        if (ifNoneMatch == etag) {
          // res.writeHead(304, {
          //   'Etag': etag
          // })
          res.statusCode = 304
          res.setHeader('Etag', etag)
          res.setHeader('MyHeaderComlum','sanfeng')
          res.end()
        } else {
          return send(req, res, filepath, etag)
        }
      })
    }
  })
}).listen(8080, () => {
  console.log('server start...')
})

function sendError (req, res) {
  res.statusCode = 404
  res.end('Not Found')
}

function send (req, res, filepath, etag) {
  res.setHeader('Content-Type', mime.getType(filepath))
  res.setHeader('Etag', etag)
  fs.createReadStream(filepath).pipe(res)
}