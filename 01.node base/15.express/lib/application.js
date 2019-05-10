const http = require('http')
// 实现Router 和应用分离
const Router = require('./router/index.js')
const methods = require('methods')
const slice = Array.prototype.slice;

function Application () {
  // this._router = new Router()
}
Application.prototype.lazyrouter = function () {
  if (!this._router) {
    this._router = new Router();
  }
}
// 遍历methods中的所有小写的方法名
methods.forEach(function (method) {
  // 此处就不需要path, 因为添加路由的方法完全交给了_router的方法处理了, 所以下面apply的参数是整个arguments
  Application.prototype[method] = function () { 
    this.lazyrouter()
    // 这样写可以支持多个处理函数, 扩展性, 这样的写法正是实现了路径的分组; 如果不这么写, 就没有意义了, 
    // 和直接写Application.prototype.get/post/put 没有区别了
    this._router[method].apply(this._router, slice.call(arguments))  // apply函数的参数需要一个数组,slice可以将arguments转化为数组的形式
    return this;
  }
})

// 参数只是处理了一个处理函数的情况, 没有考虑一个路径同时跟着多个处理函数的情况
// Application.prototype.get = function (path, handler) {
//   // 当app调用get方法的时候,才初始化路由系统
//   this.lazyrouter()
//   this._router.get(path, handler)
// }

Application.prototype.listen = function () {
  let self = this;
  let server = http.createServer(function (req, res) {
    function done () {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    // 此处的this是 createServer中的处理函数的this, 不是application的this
    self._router.handle(req, res, done);    // 第三个参数的用途是: 当没有匹配到路由时,执行默认的回调函数
  })
  server.listen(...arguments);
  // server.listen.apply(server, arguments)
}

module.exports = Application;
