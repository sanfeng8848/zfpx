let net = require('net')
let path = require('path')
let ws = require('fs').createWriteStream(path.join(__dirname, './output.txt'))

let server = net.createServer((socket) => {
  // socket.pipe(ws)
  socket.pause()
  setTimeout(function () {
    socket.pipe(ws)
  }, 5 * 1000)
})
server.listen(8080)