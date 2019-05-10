const express = require('../lib/express')
const app = express()
/**
 * 增加如下方法
 * app.use
 * express.Router()   是个方法,但是首字母大写, 返回路由实例
 */
app.use(function (req, res, next) {
  console.log('ware1:', Date.now());
  next()
})

app.get('/', (req, res, next) => {
  res.end('1')
})
  // 创建一个新的路由容器, 或者说是路由系统
  const user = express.Router()
  // 子路由系统可以使用中间件 use方法
  user.use((req, res, next) => {
    console.log('user ware:', Date.now());
    next()
  })
  // 子路由系统可以请求路径, 路径相对父路径  实际是 /user/2
  user.get('/2', function (req, res, next) {
    res.end('2234435')
  })

app.use('/user', user);
// 错误处理中间件
app.use(function (err, req, res, next) {
  res.end('catch ', err)
})

app.listen(8080, () => {
  console.log('server started....');
})
