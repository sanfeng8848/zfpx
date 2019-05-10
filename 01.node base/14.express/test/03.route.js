const express = require('express')
const app = express()

app.route('/user').get(function (req, res) {
  res.end('get /user')
})
.post(function (req, res) {
  res.end('post /user')
})
.put((req, res) => {
  res.end('put /user')
})
.delete((req, res) => {
  res.end('delete /user')
})

app.listen(8080, () => {
  console.log('start')
})
