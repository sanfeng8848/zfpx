const express = require('../lib/express')
const app = express();

app.get('/user',
  function (req, res, next) {
    console.log(1);
    next()
  },
  function (req, res, next) {
    console.log(11);
    next('error!!!')
  })

app.get('/user', function (req, res, next) {
  console.log(2);
  res.end('OK')
})
app.listen(8080, () => {
  console.log('start');
})