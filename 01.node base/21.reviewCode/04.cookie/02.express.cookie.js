let express = require('express')
let app = express()
// cookieParser的作用是将签名或者非签名的cookie写入到客户端,
// 同时服务端可以通过req.cookie拿到请求传过来的cookie
let cookieParser = require('cookie-parser')
app.use(cookieParser('ddd'))


app.get('/write', function (req, res) {
  // express自带的res.cookie的设置,但是没有获取的方法,
  // 所以使用cookieParser的作用是将签名或者非签名的cookie写入到客户端

  // 自己实现的cookie设置
  res.cookie = function (key, value, options) {
    let { domain, path, maxAge, expires, httpOnly, secure } = options
    let stack = [`${key}=${value}`]
    if (domain) {
      stack.push(`Domain=${domain}`)
    }
    if (path) {
      stack.push(`Path=${path}`)
    }
    if (maxAge) {
      stack.push(`Max-Age=${maxAge}`)
    }
    if (expires) {
      stack.push(`Expires=${expires.toUTCString()}`)
    }
    if (httpOnly) {
      stack.push(`httpOnly`)
    }
    if (secure) {
      stack.push('Secure')
    }
    let cookie = stack.join('; ')
    res.setHeader('Set-Cookie', cookie)
  }
  res.cookie('name', 'helo', {
    domain: 'localhost',
    path: '/user',
    maxAge: 10 * 1000,
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: false
  });
  res.send('Cookie is OK..')
})

app.get('/read', function (req, res) {
  // let cookie = req.headers['cookie']    //  原生的返回字符串
  let cookie = req.cookies;
  // console.log(cookie);
  let signedCookies = req.signedCookies
  console.log(signedCookies);
  console.log(signedCookies.name);
  res.send(cookie)
})

app.get('/user', (req, res) => {
  let cookie = req.headers['cookie']
  res.send(cookie)
})

app.listen(8080)