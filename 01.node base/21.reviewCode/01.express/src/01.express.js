let http = require('http')
let url = require('url')

let router = [
  {
    path: '*',
    method: '*',
    handler: function (req, res) {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
  }
]
function createApplication () {
  return {
    get (path, handler) {
      router.push({
        path,
        method: 'get',
        handler
      })
    },
    listen () {
      let server = http.createServer(function (req, res) {
        let { pathname } = url.parse(req.url, true)
        for (let i = 1; i < router.length; i++) {
          let { path, method, handler } = router[i];
          if (pathname == path && method == req.method.toLowerCase()) {
            handler(req, res)
          }
        }
        router[0].handler(req, res)
      })
      server.listen.apply(server, arguments)
    }
  }
}

module.exports = createApplication;