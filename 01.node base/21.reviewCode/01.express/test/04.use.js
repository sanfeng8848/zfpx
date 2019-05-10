// let express = require('express')
let express = require('../lib/express')
let app = express()
/**
 * 1. app.use
 * 2. express.Router()
 *    把构造函数转换成一个普通函数使用
 *    内部声明一个function, 并return fn, fn.stack = []; Object.setPropertyOf(fn, proto)
 *    proto是一个空对象,原型上有router的方法, route, route[method], route.handle
 */

app.use(function (req, res, next) {
  console.log('中间件1')
  // next('error')
  next()
})
app.get('/', function (req, res, next) {
  res.end(' / path request')
  next()
})

const user = express.Router()
user.use(function (req, res, next) {
  console.log('user 中间件', Date.now())
  next()
})
// user.get('/', function (req, res, next) {
//   console.log('user 中间件的子路由 /', Date.now());
//   next()
// })
user.use('/vip', function (req, res, next) {
  console.log('user 中间件的子路由 /vip', Date.now());
  res.end('VIP...user')
})
// user是子路由系统, 中间件的第二个参数, 应该是处理函数的形式 fn(req, res, next)
// 所以, Router构造函数的内部应该是这种形式
app.use('/user', user)   

// 错误处理中间件
app.use(function (err, req, res, next) {
  res.end('catch ', err)
})

app.listen(8080, function () {
  console.log('server started....')
})
