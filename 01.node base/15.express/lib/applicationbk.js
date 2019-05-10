const http = require('http')
const url = require('url')

// 构造函数, 原型添加方法 get, listen...
function Application () {

}

let router = [
  {
    path: '*',
    method: '*',
    handler: function (req, res) {
      res.end(`Cannot ${req.method} / ${req.url}`)
    }
  }
]
// 添加路由规则
Application.prototype.get = function (path, handler) {
  router.push({
    path,
    method: 'get',
    handler
  })
}
// 启动监听(创建server), 实例化构造函数之后,实例就可以直接调用listen方法,形参可变
Application.prototype.listen = function () {
  let server = http.createServer((req, res) => {
    // 遍历所有路由规则,判断请求方法和路径匹配一致时执行回调函数
    let { pathname } = url.parse(req.url, true)
    console.log(pathname, req.method)
    for (let i = 1; i < router.length; i++) {
      if (router[i].method == req.method.toLowerCase() && pathname == router[i].path) {
        return router[i].handler(req, res)
      }
    }
    // 如果都没有匹配上, 执行默认default的路由规则的hanlder, 即router[0].handler()
    router[0].handler(req, res)
  })
  server.listen(...arguments)
}


module.exports = Application;