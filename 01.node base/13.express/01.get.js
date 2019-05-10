const express = require('./express')
let app = express()

// app.all('*', function (req, res) {
//   res.end('all path...')
// })

app.use(function (req, res, next) {
  let start = Date.now()
  console.log(start)
  next()
})

app.get('/hello', (req, res) => {
  res.end('get hello')
})

// app.get('/world', (req, res) => {
//   res.end('world')
// })

// 使用curl 来验证post请求
// curl -X POST http://localhost:8080/postworld
app.post('/hello', (req, res) => {
  res.end('post hello')
})

// 有时候想只匹配路径, 无论什么方法都能处理, 比如无论是get 还是 post
app.all('/hello', function (req, res) {
  res.end('all hello')
})

// 可以处理, 所有请求路径*, 所有请求方法的 请求, 返回 all path
// 所以, 路由的顺序很重要
app.all('*', function (req, res) {
  res.end('all path...')
})

app.listen(8080, () => {
  console.log('server started at 8080')
})