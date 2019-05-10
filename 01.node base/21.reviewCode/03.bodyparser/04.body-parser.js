/**
 * 对请求体封装 urlencode --> object, json --> object, text --> 转码,压缩
 * 中间件 bodyParser, req
 */
let express = require('express')
let app = express()
let querystring = require('querystring')
let qs = require('qs')
let iconv = require('iconv-lite')
let type = require('content-type')   // 根据请求头中的Content-Type类型,获取内容类型和字符编码
let zlib = require('zlib')
// let bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(text())

app.listen(8080, () => {
  console.log('start')
})

app.post('/user', function (req, res, next) {
  let body = req.body;
  console.log(body);
  console.log(typeof body);
  res.send(body)
})

// 处理urlencode的中间件, 套路:内部函数, 并且是三个参数
function urlencoded (options) {
  let { extended } = options;
  return function (req, res, next) {
    let contentType = req.headers['content-type']
    if (contentType == 'application/x-www-form-urlencoded') {
      let buffers = []
      req.on('data', data => {
        buffers.push(data)
      })
      req.on('end', () => {
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

// 请求头是application/json, 服务器响应数据为json对象
function json () {
  return function (req, res, next) {
    let contentType = req.headers['content-type']
    if (contentType == 'application/json') {
      let buffers = []
      req.on('data', data => {
        buffers.push(data)
      })
      req.on('end', () => {
        let result = buffers.toString()
        req.body = JSON.parse(result)
        next()
      })
    } else {
      next()
    }
  }
}

// 对文本进行压缩和转码
function text () {
  return function (req, res, next) {
    let contentType = req.headers['content-type']
    let encoding = req.headers['content-encoding']    // 接受请求头中请求体被压缩的格式
    let typeObj = type.parse(contentType)
    let charset = typeObj.parameters.charset  // 请求头中的字符集编码
    if (typeObj.type == 'text/plain') {
      let buffers = []
      req.on('data', data => {
        buffers.push(data)
      })
      req.on('end', () => {
        let result = Buffer.concat(buffers)
        if (encoding == 'gzip') {
          result = zlib.gunzipSync(result)    // 对请求体进行解压(同步),后续再解码gbk
          console.log('result --> ', result);
        }
        if (charset == 'gbk') {
          req.body = iconv.decode(result, 'gbk')
        } else {
          req.body = result.toString()    // 默认是utf8编码, 请求过来的如果是gbk等其他编码的数据,不转码会乱码
        }
        next()
      })
    } else {
      next()
    }
  }
}