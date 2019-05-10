/**
 * 思路: 
 * 1. /user/:uid 先转换成正则
 * 2. 整合再和url地址进行匹配  比如 /user/([^\/]+?) 和 /user/1001 进行匹配
 * 3. 匹配上了就执行 对应的处理函数
 * 
 * 流程:
 * 1. 路由请求, 有路径参数 app.get('/user/:uid')
 * 2. 找app的param函数对应的uid名称
 * 3. 执行对应的处理函数, 如果有next()调用, 会继续向下执行param('uid')
 * 4. 当处理完了param之后, 再执行路由的处理函数 function (req, res) {....}
 */
let express = require('../lib/express')
let app = express()

app.param('uid', function (req, res, next, val, name) {
  req.user = { id: 1, name: 'sanfeng'}
  next()
})

app.param('uid', function (req, res, next, val, name) {
  req.user.name = 'sanfeng&jerry'
  next()
})

app.get('/user/:uid', function (req, res) {
  console.log(req.user);
  console.log(req.params);
  res.end('user')
})

app.listen(8080)