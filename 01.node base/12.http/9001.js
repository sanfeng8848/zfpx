let http = require('http')

let server = http.createServer((req, res) => {
  res.end(9001)
}).listen(9001)