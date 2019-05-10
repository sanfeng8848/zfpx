let http = require('http')
let server = http.createServer((req, res) => {
  res.end('hello 9000')
})
server.listen(9000,  () => {
  console.log('9000 port started')
})