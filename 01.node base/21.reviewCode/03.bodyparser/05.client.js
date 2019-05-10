let http = require('http')
let iconv = require('iconv-lite') // 字符编码 以及 转码
let zlib = require('zlib')

let options = {
  host: 'localhost',
  port: 8080,
  path: '/user',
  method: 'POST',
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded'
    // 'Content-Type': 'application/json'
    'Content-Type': 'text/plain; charset=gbk',
    'Content-Encoding': 'gzip'    // 代表请求体已经被压缩发给服务器
  }
}
// 请求对象
let req = http.request(options, function (response) {
  response.pipe(process.stdout)
})

// req.end('name=sanfeng&age=10&sex=M')
// req.end('{"name": "liuzhicheng"}')
// let text = iconv.encode('中国人', 'gbk')
// req.end(text)

let requestBody = iconv.encode('魅力', 'gbk')
zlib.gzip(requestBody, function (err, data) {
  req.end(data)
})

