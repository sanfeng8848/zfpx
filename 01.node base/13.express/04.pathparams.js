// 先写测试用例
const express = require('./express')
const app = express()

// express封装了请求对象的一些属性(query,path等)和方法, 方便, 不用再获取url, url.parse(url, true)进行解析url
// 依靠的是内置中间件, 也就是app.use(function (req, res, next) {}) 直接调用, 将中间件优先添加到路由中间件数组中
// 在处理请求函数处理request之前, 就处理好了req
app.get('/user', (req, res) => {
  console.log(req.query);
  console.log(req.path);
  console.log(req.hostname)
  res.end('ok')
})

app.get('/user/:name/:age', (req, res) => {
  console.log(req.params)
  res.end('ok')
})

app.listen(8080, () => {
  console.log('started 8080')
})