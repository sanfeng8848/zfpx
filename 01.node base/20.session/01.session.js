const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
let app = express()
app.use(cookieParser())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'secret',
  cookie: { maxAge: 80 * 1000 }
}))

app.get('/user', (req, res) => {
  if (req.session.lastPage) {
    console.log(`Last Page was ${req.session.lastPage}`)
  }
  req.session.lastPage = '/user'
  res.send(`user, session expires time is ${req.session.cookie.maxAge}`)
})

app.get('/product', (req, res) => {
  if (req.session.lastPage) {
    console.log(`Last Page was ${req.session.lastPage}`)
  }
  req.session.lastPage = '/product'
  res.send(`product, session expires time is ${req.session.cookie.maxAge}`)
})

app.listen(8080, function () {
  console.log('server started...');
})