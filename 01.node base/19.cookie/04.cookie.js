/**
 * 1. cookie的一些参数 domain, 指定cookie返回给客户端的域名
 *  1.1. 修改hosts文件 127.0.0.1 a.sanfeng.cn 
 *  1.2. 使用 http://a.sanfeng.cn:8080/write 重新在这个域名下写入cookie
 *  1.3. a.sanfeng.cn/read 就可以找到cookie了
 */

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())


app.listen(8080, function () {
  console.log('start')
})

app.get('/write', function (req, res) {
  res.cookie = function (key, val, options) {
    let { domain, path, maxAge, expires, httpOnly, secure } = options
    let parts = [`${key}=${val}`]  // 最终存储cookie内容数组
    if (domain) {
      parts.push(`Domain=${domain}`)
    }
    if (path) {
      parts.push(`Path=${path}`)
    }
    if (maxAge) {
      parts.push(`Max-Age=${maxAge}`)
    }
    if (expires) {
      parts.push(`Expires=${expires.toUTCString()}`)
    }
    if (httpOnly) {
      parts.push(`httpOnly`)
    }
    if (secure) {
      parts.push(`Secure`)
    }
    let cookie = parts.join('; ')
    res.setHeader('Set-Cookie', cookie)
  }
  // res.cookie('name', 'sanfeng002', {
  //   // domain: 'a.sanfeng.cn'
  //   // path: '/read1'         // 匹配的是路径前缀, 也就是 /read1/user ,或者是 /read1/product都是可以访问到cookie的
  //   magAge: 10000,           // cookie存活时间
  //   // maxAge: 900000, 
  //   httpOnly: true
  // })
  // res.cookie('name', 'zhangsan', { maxAge: 10000, httpOnly: true })
  // res.cookie('name', 'zhangsan', { expires: new Date(Date.now() + 10 * 1000) })   // 10s后过期,删除
  // res.cookie('name', 'xx', { httpOnly: true }) // 不允许客户端通过浏览器访问cookie  --> document.cookie 返回空字符串
  // res.cookie('age', 10, { secure: true })     // https
  // res.cookie('name', 'sanfeng', {
  //   domain: 'a.sanfeng.cn',
  //   path: '/read1',
  //   expires: new Date(Date.now() + 100 * 1000),
  //   // maxAge: 100 * 1000,
  //   httpOnly: true,
  //   secure: true
  // })
  // res.end('OK')
  res.cookie('name', 'zfpx', {
    httpOnly: true, //不允许客户端通过浏览的cookie访问
    secure: true,
    maxAge: 10 * 1000,
    path: '/read2',
    domain: 'localhost',
    expires: new Date(Date.now() + 10 * 1000)
  });
  res.end('ok');
})

app.get('/read2', function (req, res) {
  res.send(req.cookies)
})


app.get('/read1', function (req, res) {
  res.send(req.cookies)
})

