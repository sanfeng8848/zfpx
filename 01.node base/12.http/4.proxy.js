let http = require('http')
let httpProxy = require('http-proxy')
let proxy = httpProxy.createProxyServer({})
let url = require('url')

let server = http.createServer((req, res) => {
  // proxy.web(req, res, {
  //   target: 'http://localhost:9000'
  // })
  web(req, res, {
    target: 'http://localhost:9000'
  })
})
server.listen(7000, () => {
  console.log('主服务开启7000端口')
})

function web (req, res, options) {
  let { host, port, pathname } = url.parse(req.url)
  let opts = {
    host,
    port,
    method: req.method,
    path: pathname,
    header: req.headers
  }
  console.log(opts)
  opts.host = options.target
  http.request(opts, function (response) {
    response.pipe(res)
  })
}