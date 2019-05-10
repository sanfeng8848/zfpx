const express = require('../lib/express')

const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/user', (req, res) => {
  res.send('/user request...')
})
app.put('/user', (req, res) => {
  res.send('/user put')
})

app.listen(8080, function () {
  console.log('server started at port 8080....');
})