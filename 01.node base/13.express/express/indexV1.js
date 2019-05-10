const http = require('http')
const url = require('url')
// 构造函数执行之后返回一个函数(监听函数)
function Application () {
  // 处理请求的监听函数, 处理路由规则app.routes
  let app = function (req, res) {
    const { pathname } = url.parse(req.url, true)
    for (let i = 0; i < app.routes.length; i++) {
      let route = app.routes[i]
      // 如果请求方法和路径一致, 命中路由规则, 执行路由的处理函数
      // 我们规定, 匹配了就return, 和Koa的机制不一样
      if (route.method == req.method.toLowerCase() && route.path == pathname) {
        return route.handler(req, res)
      }
    }
    // 如果循环完了, 都没有匹配到路由规则
    res.end(`Cannot ${req.method}/${pathname}`)
  }
  // 监听端口和执行回调, 为了让app.listen可接收可变参数, 使用server.listen.apply
  app.listen = function () {
    let server = http.createServer(app)    // this --> app, 也可以传递app, 监听函数
    // console.log(this === app)               // true
    server.listen.apply(server, arguments)
  }
  // 用于保存路由规则
  app.routes = []
  // 根据不同的请求方法, 路径, 执行特定的处理函数, 执行app.get, 则向数组中添加路由对象
  app.get = function (path, handler) {
    app.routes.push({
      method: 'get',
      path,
      handler
    })
  }
  return app;
}

module.exports = Application;