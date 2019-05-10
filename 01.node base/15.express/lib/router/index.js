const Route = require('./route')
const Layer = require('./layer')
const url = require('url')
const methods = require('methods')
const slice = Array.prototype.slice;

function Router() {
  this.stack = []
}

// 创建一个Route实例, 向当前路由系统中添加一个层layer
Router.prototype.route = function (path) {
  let route = new Route(path)
  let layer = new Layer(path, route.dispatch.bind(route)) // TODO: 待实现 route.dispatch
  layer.route = route
  this.stack.push(layer)
  return route
}

methods.forEach(function (method) {
  Router.prototype[method] = function (path) {
    // 往Router里添加一层(顶层), 看route函数的实现 new Route(path),let layer=...,this.stack.push(layer)
    let route = this.route(path);
    // 向Route里添加一层
    route[method].apply(route, slice.call(arguments, 1))
    return this;    // 链式调用
  }
})


// Router.prototype.get = function (path, handler) {
//   // 往Router里添加一层(顶层), 看route函数的实现 new Route(path),let layer=...,this.stack.push(layer)
//   let route = this.route(path)
//   // 向Route里添加一层
//   route.get(handler)
// }


Router.prototype.handle = function (req, res, out) {    // out的作用是什么?
  // TODO
  let idx = 0, self = this;
  let { pathname } = url.parse(req.url, true);
  // 执行下一个路由层
  function next() {
    // 当都匹配完了, 就要退出路由系统了
    if (idx >= self.stack.length) {
      return out();
    }
    let layer = self.stack[idx++]
    // 如果这一层的路径与请求路径是否匹配 并且是否使用route函数(做了路径分组) 
    // 并且查看这一层layer是否有对应的请求方法, 没有就不处理了(比如layer一层中只有method=get, 请求的是post)
    if (layer.match(pathname) && layer.route && layer.route.handle_method(req.method)) {
      layer.handle_request(req, res, next);
      // if (err) {
      //   layer.handle_error(err, req, res, next);
      // } else {
      //   // 本可以layer.handler(req, res, next), 但是此处包装一下,方便以后扩展
      //   layer.handle_request(req, res, next);
      // }
    } else {
      next();
    }
  }
  next();
}

module.exports = Router;