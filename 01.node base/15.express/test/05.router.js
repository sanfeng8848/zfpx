const express = require('../lib/express')
const app = express();

app.get('/', function (req, res, next) {
  console.log(1)
  next()
  // next('wrong') // 如果任何出错了, 会把错误交给next, 然后跳过后面所有的正常处理函数, 交给错误处理中间件来进行处理
}, function (req, res, next) {
  console.log(111)
  next();
})

app.get('/2', function (req, res, next) {
  console.log(2)
  next()
})

app.get('/', function (req, res, next) {
  console.log(3)
  res.end('OK')
})


app.listen(8080, function () {
  console.log('server started....');
})