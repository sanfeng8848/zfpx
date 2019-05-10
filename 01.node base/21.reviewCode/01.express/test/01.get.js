// const express = require('../src/01.express')
const express = require('../lib/express')
const app = express()

app.get('/', function (req, res) {
  res.end('OK HELLO!!!')
})

app.listen(8080, function () {
  console.log('server started....')
})