const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').__express)

// 权限验证中间件,如果没有登录就跳转到login
function checkLogin (req, res, next) {
  if (req.cookies.username) {
    next()
  } else {
    res.redirect('/login')
  }
}

// 请求表单,显示页面
app.get('/login', function (req, res) {
  res.render('login', { title: '登录' })
})
// 提交表单, bodyParser
app.post('/login', function (req, res) {
  let user = req.body;
  // 验证正确重定向到用户界面,否则login页面 redirect发出的是get请求
  // 验证通过,写cookie
  if (user.username == '1' && user.password == '1') {
    res.cookie('username', user.username, {
      httpOnly: true,          // httpOnly也是不安全的,因为可以通过其他方式请求,可以篡改cookie, httpOnly只是针对浏览器不能篡改
      expires: new Date(Date.now() + 30 * 1000),
      maxAge: 15 * 1000
    })
    res.redirect('/user')
  } else {
    res.redirect('/login')
  }
})

app.get('/user', checkLogin, (req, res) => {
  let { username } = req.cookies
  res.render('user', { title: '登录', username })
})

app.listen(8080)