const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser('jiami'))
app.get('/write', function (req, res) {
  res.cookie('name', 'sanfeng', { signed: true })
  res.cookie('age', 10)
  res.end('OK')
})

app.get('/read', function (req, res) {
  // let cookie = req.headers['cookie']
  // res.send(cookie)
  console.log(req.signedCookies);   // 保存的是签名过后的cookie
  res.send(req.cookies)   // 返回的是对象  返回的是未签名的cookie
})

app.listen(8080)

// s%3A10.SGGCsyQFCDcM6GgL4VPIf%2BGu6YAjFqKyF%2FhGkhUWiDg
// 1. cookie如何修改
// document.cookie = "name=s%3Asanfeng.Xt4lw9VU7b09LkoElVwMBpLB4z%2B2kLmPXH8qUH14j50"
// document.cookie = "name=s%3AXXX.Xt4lw9VU7b09LkoElVwMBpLB4z%2B2kLmPXH8qUH14j50"   修改之后 将值为sanfeng改为XXX
// 然后服务器返回的name的值就不是原始的一个长串了,就是{ name: false }  服务器认为cookie的值已经被篡改过了,就不认了

// cookie加密
/**
 * 1. 使用res.cookie('name', 'liuzhicheng', { signed: true}) 对cookie进行加密
 * 2. 如何解密
 * document.decodeURI
 */


// console.log(decodeURIComponent('name=s%3Asanfeng.Xt4lw9VU7b09LkoElVwMBpLB4z%2B2kLmPXH8qUH14j50'))
// name=s:sanfeng.Xt4lw9VU7b09LkoElVwMBpLB4z+2kLmPXH8qUH14j50