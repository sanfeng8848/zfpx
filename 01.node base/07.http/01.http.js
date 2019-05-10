let http = require('http')
let url = require('url')

let server = http.createServer()
server.on('connection', () => {
  console.log('客户端已经连接');
})
// curl -v --data username=sanfeng http://localhost:8080 -X POST
server.on('request', (req, res) => {
  console.log(req.method);
  console.log(req.url);
  let { pathname, query } = url.parse(req.url, true)
  console.log(pathname, query);
  console.log(req.headers)

  let result = []
  // buffer数据, 监听客户端发来的请求体
  req.on('data', data => {
    result.push(data)
  })
  req.on('end', () => {
    res.end(Buffer.concat(result).toString())
  })
})

server.on('error', (err) => {
  console.log(err)
})
server.on('close', () => {
  console.log('server 断开close');
})

server.on('end', () => {
  console.log('服务器end');
})

server.listen(8080, () => {
  console.log('服务器listening 8080');
})