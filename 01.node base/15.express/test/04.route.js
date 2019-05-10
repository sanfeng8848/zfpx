const express = require('express')
const app = express()

app.route('/user')
  .get(function (req, res) {
    res.send('get /user')
  })
  .put(function (req, res) {
    res.send('put /user')
  })

// 错误处理中间件测试用例
app.get('/product', function (req, res, next) {
  console.log('product1');
  next()
}, function (req, res, next) {
  console.log('product2');
  next()
}, function (req, res, next) {
  console.log('product3');
  next('error')
})

app.get('/product', (req, res) => {
  res.end('product end')
})


app.listen(8080, () => {
  console.log('server started...')
})