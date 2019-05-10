let http = require('http')
// 原生的写法
http.createServer(function (req, res) {
  if (req.url == '/write') {
    res.setHeader('Set-Cookie', 'name=sanfeng')
    res.end('OK Cookie is write to client')
  } else if (req.url == '/read') {
    let cookie = req.headers['cookie']
    res.end(cookie)
  } else {
    res.end('Not Found')
  }
}).listen(8080, () => {
  console.log('start...');
})