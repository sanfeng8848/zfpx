let http = require('http')
let url = require('url')
let methods = require('methods')
let Router = require('./router')

function Application () {
}

let router = [
  {
    path: '*',
    method: 'get',
    handler: function (req, res) {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
  }
]

Application.prototype.lazyrouter = function () {
  if (!this._router) {
    this._router = new Router()
  }
}
methods.forEach(function (method) {
  Application.prototype[method] = function (path) {
    this.lazyrouter()
    // 责任分离给router的get方法处理, 将所有的参数传递给路由系统(路径path, 处理函数handler)
    this._router[method].apply(this._router, arguments)
    // 目的: 支持链式调用 app.get(...).get(...)  因为第一个get调用完返回的是依然是app实例
    return this
  }
})
// Application.prototype.get = function () {
//   this.lazyrouter()
//   this._router.get.apply(this._router, arguments);
//   return this;    
// }

// 添加use方法 中间件和路由都会放在 this._router.stack中
Application.prototype.use = function () {
  this.lazyrouter()
  this._router.use.apply(this._router, arguments)
}

// 处理路径参数 /user/:uid
Application.prototype.param = function () {
  this.lazyrouter()
  this._router.param.apply(this._router, arguments)
}

Application.prototype.listen = function () {
  let server = http.createServer((req, res) => {
    let self = this;
    /**
     * 初版
    let { pathname } = url.parse(req.url, true)
    for (let i = 1; i < router.length; i++) {
      let { path, method, handler } = router[i]
      if (path == pathname && method == req.method.toLowerCase()) {
        handler(req, res)
      }
    }
    router[0].handler(req, res)
     *  */
    // 定义一个没有任何路由匹配的情况下的结束
    function done () {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    // 把路由的处理交给_router实例
    self._router.handle(req, res, done)
  })
  server.listen(...arguments)
}


module.exports = Application;