/**
 * 1. 使用加密算法对请求资源(有可能是大文件)计算标识, 把标识发给client的浏览器
 * 2. 下次请求带上这个etag标识, if-none-match的请求头, 和服务器端的对这个资源计算后的结果进行比较
 * 3. 比较相等，使用缓存；不等，直接请求文件
 * 
 * ============== 问题
 * 1. 本例使用fs.readFile, 如果文件很大, 需要消耗更多的内存
 * 2. 可以改成流操作, 读一块数据, update一次, 最后digest
 */

const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const crypto = require('crypto')

http.createServer((req, res) => {
  let { pathname } = url.parse(req.url, true)
  let filepath = path.join(__dirname, pathname)

  fs.stat(filepath, (err, stat) => {
    if (err) {
      return sendError(req, res)
    } else {
      // 获取客户端请求头中涉及到缓存的请求头字段 if-none-match
      let ifNoneMatch = req.headers['if-none-match'];   // 这个请求头信息是server发给client,浏览器保存的
      fs.readFile(filepath, (err, content) => {
        let etag = crypto.createHash('md5').update(content).digest('hex')
        if (ifNoneMatch == etag) {
          res.writeHead(304)
          res.end()
        } else {
          return send(req, res, filepath, etag)
        }
      })
    }
  })
}).listen(8080, () => {
  console.log('server started...')
})

function send(req, res, filepath, etag) {
  res.setHeader('Content-Type', mime.getType(filepath))
  // 第一次服务器返回的时候，会把文件的内容算出一个标识,发给客户端
  res.setHeader('Etag', etag)
  // 客户端看到etag之后, 也会把此标识符保存到客户端, 下次请求服务器，发给server
  fs.createReadStream(filepath).pipe(res)
}

function sendError(req, res) {
  res.end('Not Found')
}