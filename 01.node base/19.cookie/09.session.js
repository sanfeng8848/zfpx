const express = require('express')
const app = express()
const session = require('express-session')
const path = require('path')
let FileStore = require('./store')(session)

app.use(session({
  resave: true,
  saveUninitialized: true,
  store: new FileStore({
    root: path.join(__dirname, 'sessions'),
    maxAge: 10 * 1000
  }),
  secret: 'secret',
  cookie: {
    expires: new Date(Date.now() + 10000)
  }
}))

app.get('/', (req, res) => {
  let count = req.session.count;
  if (count) {
    count++  
  } else {
    count = 1
  }
  req.session.count = count;
  res.send(`欢迎第${count}次访问`)
})


// app.get('/', function (req, res) {
//   let session = req.session;
//   if (session.count) {
//     session.count++
//     res.setHeader('Content-Type', 'text/html')
//     res.send(`欢迎第${session.count}次访问`)
//   } else {
//     session.count = 1;
//     res.send(`欢迎第${session.count}次登陆访问`)
//   }
// })
app.listen(8080)

