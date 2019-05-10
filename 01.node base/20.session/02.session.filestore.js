const express = require('express')
const app = express()
const session = require('express-session')
const FileStore = require('./sessionstore')(session)
const path = require('path')

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'abb',
  cookie: { maxAge: 30 * 1000 },
  // 没有加store选项的是, 开发环境or测试环境, 可能会导致内存泄漏
  store: new FileStore({
    root: path.join(__dirname, 'sessions'),
    maxAge: 10 * 1000
  })
}))
app.listen(8080, () => {
  console.log('start...');
})

app.get('/', function (req, res) {
  let views = req.session.views;
  if (views) {
    views++
  } else {
    views = 1
  }
  req.session.views = views;
  res.send(`第${views}访问website`)
})

