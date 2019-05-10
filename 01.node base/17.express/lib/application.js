const http = require('http')
const url = require('url')
const methods = require('methods')
const Router = require('./router')

function Application () {

}

Application.prototype.lazyrouter = function () {
  if (!this._router) {
    this._router = new Router()
    // console.log('this._router', this._router)
  }
}
// 遍历所有请求方法
methods.forEach(function (method) {
  // 将app实例的请求方法转嫁给router的请求方法, 函数参数使用arguments
  Application.prototype[method] = function () {
    this.lazyrouter()
    this._router[method].apply(this._router, arguments)
  }
})

// 添加中间件, 而中间件和普通的路由都是放在一个数组中的, 放在this._router.stack
Application.prototype.use = function () { // 函数的参数通传(全部传递给函数内部的函数)
  this.lazyrouter()
  this._router.use.apply(this._router, arguments)
}


Application.prototype.listen = function () {
  let self = this;
  let server = http.createServer((req, res) => {
    // 如果没有任何路由规则匹配的话会走done方法
    function done () {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    self._router.handle(req, res, done)  // 要缓存this, 接受三个参数, 第三个就是next, 决定路由是否向下执行
  })
  server.listen(...arguments)
}

module.exports = Application;