const express = require('express')
const app = express()
/**
 * param方法的运行原理   见  path.js中的测试代码
 * 1. 先将 /user/:uid 字符串转换为正则 --> let reg = /\/user\/([^\/]+)/
 * 2. 然后使用正则规则和url路径进行匹配, 获取到对应的路径参数 uid
 * 
 * 第三方模块 require('path-to-regexp')
 */

app.param('uid', function (req, res, next, val, name) {
  req.user = {id: 1, name:"zfpx"}
  next()
})
app.param('uid', (req, res, next, val, name) => {
  req.user.name = 'zfpx2'
  next()
})
app.get('/user/:uid', (req, res) => {
  console.log(req.user);
  res.end('user')
})

app.listen(8080)