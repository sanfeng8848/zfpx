/**
 * 第一次请求之后, 响应头字段: Last-Modified: Fri, 22 Mar 2019 02:55:06 GMT
 * 第二次请求, 如果If-Modifeid-Since与Last-Modified一致, 只是返回304,不响应内容即可
 *    req:  请求头会带上If-Modified-Since这个头字段
 *          If-Modified-Since: Fri, 22 Mar 2019 02:55:06 GMT
 *    res:  响应码 304
 */

const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

http.createServer((req, res) => {
  let { pathname } = url.parse(req.url, true)
  let filepath = path.join(__dirname, pathname)

  fs.stat(filepath, (err, stat) => {
    if (err) {
      return sendError(req, res)
    } else {
      // 获取客户端请求头中涉及到缓存的请求头字段
      let ifModifiedSince = req.headers['if-modified-since'];   // 这个请求头信息是server发给client,浏览器保存的
      // 获取服务器被请求资源的最后修改时间
      let LastModifed = stat.ctime.toGMTString()
      if (ifModifiedSince == LastModifed) {
        res.writeHead(304)
        res.end()
      } else {
        return send(req, res, filepath, stat)
      }
    }
  })
}).listen(8080, () => {
  console.log('server started...')
})

function send (req, res, filepath, stat) {
  res.setHeader('Content-Type', mime.getType(filepath))
  // 第一次请求,服务器会把文件的最后修改时间发送给客户端, 客户端浏览器会保存起来, 下次再次请求此资源时会带上这个时间
  // 一起发送给服务器
  res.setHeader('Last-Modified', stat.ctime.toGMTString())
  fs.createReadStream(filepath).pipe(res)
}

function sendError (req, res) {
  res.end('Not Found')
}