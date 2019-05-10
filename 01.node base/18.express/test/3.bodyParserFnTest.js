const express = require('express')
const app = express()
const http = require('http')
// const bodyParser = require('body-parser')
const urlencoded = require('../src/03.urlencoded')
const json = require('../src/04.json.js')
const text = require('../src/05.text')

// 处理json的请求体
// app.use(bodyParser.json())
// 处理表单格式 就是urlencoded格式的请求体
// app.use(bodyParser.urlencoded({ extended: true }))  // 原生的bodyParser实现的urlencoded


app.use(urlencoded({ extended: true }))   // 自己实现
app.use(json())
app.use(text())


app.use(function (req, res, next) {
  // 类似的还有res.json(), 把对象转换成一个json对象返回给客户端
  res.send = function (data) {
    let type = typeof data
    // 只需要处理对象和数字,其他类型字符串和buffer都是直接返回 res.end()即可
    switch (type) {
      case 'object':
        data = JSON.stringify(data)
        break;
      case 'number':
        res.statusCode = data;
        data = http.STATUS_CODES[data]
        break;
      default:
        break;
    }
    res.end(data)
  }
  next()
})
// echo服务 
app.post('/user', (req, res) => {
  let body = req.body
  res.send(body)  // send可以根据参数的类型进行兼容处理  send是在内置中间件实现的
})
app.listen(8080, function () {
  console.log('started....!!!');
})
