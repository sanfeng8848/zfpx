const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser('secret'))

app.get('/write', function (req, res) {
  res.cookie('name', 'zhicheng', { signed: true})
  res.cookie('age', 30)
  res.send('OK')
})

app.get('/read', (req, res) => {
  let obj = {}
  obj.signedCookies = req.signedCookies
  obj.notSignedCookies = req.cookies
  res.send(obj)
})

app.listen(8080, function () {
  console.log('server started')
})