/**
 * 1. 使用cookie实现用户的登录状态
 */
let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let path = require('path')
let app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').__express)

// 中间件
function checkLogin (req, res, next) {
  if (req.cookies.username) {
    next()
  } else {
    res.redirect('/login')
  }
}

// 登录页面
app.get('/login', function (req, res) {
  res.render('login', { title: '用户登录啦'})
})

// 登录页面进行登录的请求
app.post('/login', function (req, res) {
  let user = req.body;
  if (user.username == '1' && user.password == '1') {
    res.cookie('username', user.username, {
      httpOnly: true
    })
    res.redirect('/welcome')    // redirect 的请求方法是get
  } else {
    res.redirect('/login')
  }
})


app.get('/welcome', checkLogin, function (req, res) {
  let { username } = req.cookies
  let views = req.cookies.views;
  if (views) {
    views++
  } else {
    views = 1
  }
  res.cookie('views', views)
  res.render('welcome', { username, views })
})


// 要从cookie中拿到username
// app.get('/welcome', checkLogin, function (req, res) {
//   let username = req.cookies.username;
//   let views = req.cookies.views;    // 在cookie中存储浏览次数
//   let count;
//   if (views) {
//     views++
//   } else {
//     views = 1;
//   }
//   // 重新设置cookie中的浏览次数
//   res.cookie('views', views)
//   res.render('welcome', { username, views })
// })



app.listen(8080, function () {
  console.log('started...')
})