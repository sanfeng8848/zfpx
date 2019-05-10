const express = require('express')
const app = express()
const session = require('express-session')

app.use(session({
  secret: 'zfpx',
  cookie: ('name', 'sanfeng', { maxAge: 30 * 1000}),
  resave: true,
  saveUninitialized: true
}))

app.get('/', function (req, res, next) {
  let session = req.session
  console.log(session);
  if (session.views) {
    session.views++
    res.setHeader('Content-Type', 'text/html')
    res.send(`欢迎第${session.views}次访问`)
  } else {
    session.views = 1
    res.send(`欢迎第一次登陆访问`)
  }
})

app.listen(8080)