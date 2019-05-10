// 第二个测试用例

const express = require('../lib/express')
const app = express()

app
  .get('/user', (req, res, next) => {
    console.log(1)
    next('wrong')
  }, (req, res, next) => {
    console.log(11)
    next()
  })
  .get('/user', function (req, res, next) {
    console.log(2)
    next('error')
  })
  .get('/user', function (req, res, next) {
    console.log(3)
    res.end('OK')
  })


app.listen(8080, function () {
  console.log('server started....')
})