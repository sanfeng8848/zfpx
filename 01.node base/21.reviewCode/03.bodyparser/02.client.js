/**
 * 模拟客户端请求,不写html的表单提交请求了
 */

let http = require('http')
let iconv = require('iconv-lite')
let zlib = require('zlib')
let options = {
  host: 'localhost',
  port: 8080,
  method: 'POST',
  path: '/user',
  // 请求头
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded'
    // 'Content-Type': 'application/json'
    'Content-Type': 'text/plain; charset=gbk',
    'Accept-Encoding': 'gzip'     // 浏览器可以支持的压缩格式, 服务端接收到这个请求头字段,将数据以gzip格式进行压缩,并返回
  }
}
let req = http.request(options, function (res) {
  res.pipe(process.stdout)
})

// 请求体是urlencoded类型
// req.end('name=sanfeng&age=10')

// 请求体是json形式的
// req.end('{"name": "liuzhicheng", "age": "10"}')

// 请求体文本内容  utf8默认编码
// req.end('你好世界')

// 请求体的文本是gbk编码,服务端需要先获取请求头的charset, 然后使用iconv进行解码
// req.end(iconv.encode('珠峰培训', 'gbk'))

let body = iconv.encode('你好世界', 'gbk')

// 对请求体body进行压缩, 然后压缩之后的结果data发给服务器
zlib.gzip(body, (err, data) => {
  req.end(data)
})