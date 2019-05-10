let net = require('net')

let server = net.createServer({}, function (socket) {
  console.log(socket.address())
  socket.on('data', data => {
    console.log(data);
  })
})

server.listen(8080, function () {
  console.log(server.address());
  console.log('服务器启动成功');
})