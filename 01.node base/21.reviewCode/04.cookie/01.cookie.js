// 原生
let http = require('http')
let url = require('url')

http.createServer(function (req, res) {
  let { pathname } = url.parse(req.url, true)
  // console.log(req.url)
  // console.log(pathname)
  if (pathname == '/write') {
    res.setHeader('Set-Cookie', 'name=sanfeng&age=10')
    res.end('Cookie write ok..')
  }
  if (pathname == '/read') {
    let cookie = req.headers['cookie']
    res.end(cookie)
  }
  res.end('Not found')
}).listen(8080)