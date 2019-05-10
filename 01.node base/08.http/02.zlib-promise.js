const zlib = require('zlib')
const http = require('http')
const fs = require('fs')
const mime = require('mime')
const util = require('util')
const url = require('url')
const path = require('path')
// 转换fs.stat为promise的形式
let stat = util.promisify(fs.stat)

let server = http.createServer(request).listen(8080, () => {
  console.log('server started..')
})

async function request (req, res) {
  // 解析请求
  let { pathname } = url.parse(req.url)
  let filepath = path.join(__dirname, pathname)
  try {
    let obj = await stat(filepath)
    res.setHeader('Content-Type', mime.getType(pathname))
    // get client accept-encoding
    let acceptEncoding = req.headers['accept-encoding']
    if (acceptEncoding) {
      if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip')
        fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res)
      } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate')
        fs.createReadStream(filepath).pipe(zlib.createDeflate()).pipe(res)
      } else {
        fs.createReadStream(filepath).pipe(res)
      }
    } else {
      fs.createReadStream(filepath).pipe(res)
    }
  } catch (error) {
    res.statusCode = 404
    res.end()
  }
}