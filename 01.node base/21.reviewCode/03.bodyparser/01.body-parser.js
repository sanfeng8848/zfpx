let querystring = require('querystring')
let qs = require('qs')
let iconv = require('iconv-lite')   // 服务端用于解码用
let type = require('content-type')  // 用于获取内容类型的字符集编码
let zlib = require('zlib')
let express = require('express')
let app = express()

app.use(urlencoded({ extended: false }))
app.use(json())
app.use(text())
app.listen(8080)

app.post('/user', function (req, res) {
  let body = req.body
  console.log("body --> ", body);
  res.send(body)
})
// 处理请求数据 把键值对形式的请求体转换成对象 req.body = qs.parse(result)
function urlencoded(options) {
  let { extended } = options;
  return function (req, res, next) {
    // 1. 拿到请求体内容类型 1. x-www-form-urlencoded 2. multipart/form-data
    let contentType = req.headers['content-type']
    if (contentType == 'application/x-www-form-urlencoded') {
      let buffers = []
      req.on('data', function (data) {
        buffers.push(data)
      })
      req.on('end', function () {
        let result = buffers.toString()
        if (extended) {
          req.body = qs.parse(result)
        } else {
          req.body = querystring.parse(result)
        }
        next()
      })
    } else {
      next()
    }
  }
}

// 把json格式的请求体转换为对象
function json() {
  return function (req, res, next) {
    let contentType = req.headers['content-type']
    if (contentType == 'application/json') {
      let buffers = []
      req.on('data', function (data) {
        buffers.push(data)
      })
      req.on('end', function () {
        let result = buffers.toString()
        req.body = JSON.parse(result)
        next()
      })
    } else {
      next()
    }
  }
}

function text() {
  return function (req, res, next) {
    let contentType = req.headers['content-type']
    let encoding = req.headers['accept-encoding']
    let typeObj = type.parse(contentType)
    let charset = typeObj.parameters.charset
    if ('text/plain' == typeObj.type) {      // typeObj.type === 'text/plain'
      let buffers = []
      req.on('data', data => {
        buffers.push(data)
      })
      req.on('end', () => {
        let result = Buffer.concat(buffers)
        if (encoding == 'gzip') {
          result = zlib.gunzipSync(result)    // 对buffer 采用gzip的方式压缩
        }
        if (charset == 'gbk') {
          req.body = iconv.decode(result, charset)
        } else {
          req.body = result.toString()     // 如果客户端发过来的请求体是gbk, 服务端不做任何处理, 就会是乱码
        }
        next()
      })
    } else {
      next()
    }
  }
}
