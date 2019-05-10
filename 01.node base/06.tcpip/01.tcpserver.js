let net = require('net')
// 创建一个服务器，监听客户端的连接，当客户端连接上来之后执行监听函数
// socket是一个双工流 duplex 可读可写
let server = net.createServer(function (socket) {
  console.log('客户端已经连接')
  console.log(socket.address())
  socket.on('data', function (data) {
    console.log('接受到客户端发来的数据 %s, %s', data, 1);
    socket.write("server resp: ", data)
  })
  // 服务器端断开了, 触发
  socket.on('error', function (err) {
    console.log(err);
  })
  // 
  socket.on('end', function () {
    console.log('end');
  })
})

server.listen(8080, function () {
  console.log(server.address());
  console.log('服务器启动成功');
})