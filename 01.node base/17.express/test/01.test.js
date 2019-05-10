const express = require('../lib/express')
const app = express()

// app.get('/user', function (req, res, next) {
//   console.log('1');
//   next()
// }, function (req, res, next) {
//   console.log('2')
//   next()
// })

app.get('/user', function (req, res, next) {
  console.log('hello');
  next('wrong!!!')
}, function (req, res, next) {
  console.log('world');
  next()
})
app.get('/user', function (req, res, next) {
  console.log('3');
  res.end('OKffffffffffffffff');
  next()
})

app.get('/user', function (req, res, next) {
  console.log('333');
  res.end('OKiiii')
})

app.listen(8080, () => {
  console.log('server started....');
})