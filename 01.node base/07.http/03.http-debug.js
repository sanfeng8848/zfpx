const http = require('http')

let server = http.createServer()

server.on('request', (req, res) => {
  res.end('ok')
})
server.listen(8080)