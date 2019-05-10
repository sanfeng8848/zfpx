const express = require('express')
const app = express()
const path = require('path')
const url = require('url')

app.use(function (req, res, next) {
  let { pathname } = url.parse(req.url, true)
  let method = req.method.toLowerCase()
  console.log('====================================');
  console.log(pathname, ' --- ', method);
  console.log('====================================');
  next();
})

app.get('/', (req, res) => {
  console.log('path /')
  res.end('ok')
})

app.listen(8080)