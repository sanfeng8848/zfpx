const express = require('express')
const app = express()
const path = require('path')
const static = require('../src/02.static.new')   // 负责静态资源文件的请求响应, static的调用应该返回中间件函数

// 内置的静态服务中间件
app.use(static(path.join(__dirname,'../public'), {
  maxAge: 1000*60,
  extensions: ['html', 'htm'],
  // 设置自定义的响应头, 设置自定义的响应头time, 然后要执行回调函数, 即要访问资源, 否则pending了
  setHeaders (req, res, callback) {
    res.setHeader('time', Date.now())
    callback()
  }
}))

app.get('/user', function (req, res) {
  res.end('user')
})
app.listen(8080, () => {
  console.log('started...')
})