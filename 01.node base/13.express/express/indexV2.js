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
      if ( (route.method == req.method.toLowerCase() || route.method == 'all') 
            && (route.path == pathname) || route.path == '*') {  // * 匹配所有路径
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
  // http.METHODS 记录着所有http请求的请求方法
  // 根据不同的请求方法, 路径, 执行特定的处理函数, 执行app.get, 则向数组中添加路由对象
  http.METHODS.forEach(method => {
    // 转换成小写
    method = method.toLowerCase()
    app[method] = function (path, handler) {
      app.routes.push({
        method,
        path,
        handler
      })
    }
  })

  // 任意请求方法都进行处理, 需要在
  app.all = function (path, handler) {
    app.routes.push({
      method: 'all',
      path,
      handler
    })
  }

  return app;
}

module.exports = Application;