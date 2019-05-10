const http = require('http')
const url = require('url')
let router = [
  {
    path: '*',
    method: 'get',
    handler: function (req, res) {
      res.end(`Cannot ${req.method} / ${req.url}`)
    }
  }
]
function createApplication () {
  return {
    // 添加路由规则
    get (path, handler) {
      router.push({
        path,
        method: 'get',
        handler
      })
    },
    // 启动监听
    listen () {
      let server = http.createServer(function (req, res) {
        // 匹配请求路径和方法与路由表中的是否一致,如果一致, 调用回调函数
        let { pathname} = url.parse(req.url, true)
        for (let i = 1; i < router.length; i++) {
          let { path, method, handler } = router[i]
          if (pathname == path && method == req.method.toLowerCase()) {
            handler(req, res)
          }
        }
        // 如果没有匹配路由表中的路由规则, 那么走默认的规则, 即router[0]的回调函数
        router[0].handler(req, res)
      })
      server.listen.apply(server, arguments)
    }
  }
}

module.exports = createApplication;