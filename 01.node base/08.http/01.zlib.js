/**
 * 1. 实现http请求中, 请求文件或数据, 服务器进行压缩, 客户端进行解压的过程
 * 2. 客户端的可以识别的压缩格式不是自己设置的，是由浏览器厂商决定的, 可以使用curl设置Accept-Encoding: deflate
 *    模拟: curl -v -H "Accept-Encoding: deflate" http://localhost:8080/msg.txt
 */
const zlib = require('zlib')
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

let server = http.createServer(function (req, res) {
  // debugger
  // 1. 获取路径名
  let { pathname } = url.parse(req.url)
  if (!pathname.includes('favicon.ico')) {
    // 2. 组织文件的绝对路径
    let filePath = path.join(__dirname, pathname)
    // 3. 判断文件是否存在
    fs.stat(filePath, (err, stat) => {
      if (err) {
        console.log(err);
        res.statusCode = 404
        res.end()
      }
      // console.log(stat);
      // 4. 根据不同的文件类型,设置响应头的内容类型,mime
      res.setHeader('Content-Type', mime.getType(pathname))
      // 5. 获取浏览器支持的压缩格式 gzip deflate...
      // 为了兼容不同的浏览器，node把所有的请求头全转成了小写
      let AcceptEncoding = req.headers['accept-encoding']
      // 6. 内容协商, 浏览器支持哪种压缩格式, 服务器就使用哪种, 都不支持, 就不压缩
      // 如果存在,判断压缩格式, 不存在, 不压缩
      if (AcceptEncoding) {
        if (AcceptEncoding.match(/\bgzip\b/)) {
          // 告诉浏览器,server使用的压缩格式
          res.setHeader('Content-Encoding', 'gzip')
          fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res)
        } else if (AcceptEncoding.match(/\bdeflate\b/)) {
          res.setHeader('Content-Encoding', 'deflate')
          fs.createReadStream(filePath).pipe(zlib.createDeflate()).pipe(res)
        } else {
          fs.createReadStream(filePath).pipe(res)
        }
      } else {
        fs.createReadStream(filePath).pipe(res)
      }
    })
  }
})

server.listen(8080, () => {
  console.log('server is started... at port 8080');
})

