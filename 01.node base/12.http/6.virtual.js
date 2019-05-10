let http = require('http')
let httpProxy = require('http-proxy')
let proxy = httpProxy.createProxyServer()
let url = require('url')

let config = {
  "sanfeng.com.cn": "http://localhost:8000",
  "zhicheng.com.cn": "http://localhost:9001"
}

http.createServer((req, res) => {
  let host = req.headers['host']
  console.log(host)
  let target = config[host]
  if (target) {
    proxy.web(req, res, {
      target
    })
  } else {
    res.end(host)
  }
}).listen(80, function () {
  console.log('server start at port 80')
})