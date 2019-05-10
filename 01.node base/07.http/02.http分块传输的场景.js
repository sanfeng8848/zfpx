const http = require('http')

let server = http.createServer()

server.on('connection', socket => {
  console.log('客户端与服务器建立连接')
  socket.on('end', () => {
    console.log('客户端与服务器断开连接请求动作, ACK');
  })
  socket.on('close', () => {
    console.log('最终断开连接');
  })
})

server.on('request', (req, res) => {
  console.log('request')
  console.log(req.url)
  console.log(req.headers);
  // 多次write,会一次次的将大数据分块传输 Transfer-Encoding: chunked
  res.write('hello')
  res.write('wrodl')
  console.log('分块传输')
  res.end()
})


server.listen(8080, () => {
  console.log('serve started...');
})