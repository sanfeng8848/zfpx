const methods = require('methods')
const Route = require('./route')
const Layer = require('./layer')
const url = require('url')
const slice = Array.prototype.slice;
// 创建路由容器
function Router () {
  function router (req, res, next) {
    router.handle(req, res, next)
  }
  // 初始化一个路由数组
  // this.stack = [];
  Object.setPrototypeOf(router, proto); // 实现继承,把router的原型指向了proto
  router.stack = [];
  return router;
}
// 创建一个对象,没有原型属性和方法,所有的路由属性和方法全部从这个对象上扩展
let proto = Object.create(null)

methods.forEach(method => {
  proto[method] = function (path) {
    let route = this.route(path)
    console.log('route: ', route);
    // 处理所有的请求方法,router实例的请求方法的处理, 转移给route实例去做
    route[method].apply(route, slice.call(arguments, 1))
    return this;
  }
})

//创建一个Route实例，向当前路由系统中添加一个层
proto.route = function (path) {
  // 创建路由实例, 属性只有path,stack数组和methods请求方法存储
  let route = new Route(path) // path, stack, methods
  // layer: 相同路径下, 处理多个请求方法,如 app.get('/user', fn1, fn2,...)
  // 传递的引用, 就是调用next()遍历layer中所有处理函数的方法
  // 当路径匹配,请求方法匹配if (layer.match(pathname) && layer.route && layer.route.handle_method(req.method))
  // 就直接把一层的路由处理函数全部调用 next()...
  let layer = new Layer(path, route.dispatch.bind(route))   
  layer.route = route;
  // 最后将路由整合的路由对象,放入最外层的路由容器中
  this.stack.push(layer)
  return route;
}

// 添加中间件
proto.use = function (path, handler) {
  if (typeof handler != 'function') {   // 也就是只传递处理函数, handler就是undefined
    handler = path;
    path = '/'
  }
  let layer = new Layer(path, handler)
  layer.route = undefined;    // 中间件没有路由属性
  this.stack.push(layer)
  return this;
}

// 最外层的路由
proto.handle = function (req, res, out) {
  let idx = 0, self = this;
  let { pathname } = url.parse(req.url, true)
  function next (err) {
    if (idx >= self.stack.length) {
      // 当遍历所有路由之后,就调用实参函数 Application.prototype.listen方法中的done函数
      return out();   
    }
    let layer = self.stack[idx++];  // 此处的layer是外层路由
    // 如果外层路由的路径pathname和请求方法存在,直接调用处理函数
    if (layer.match(pathname) && layer.route && layer.route.handle_method(req.method)) {
      if (err) {
        layer.handle_error(err, req, res, next);
      } else {
        // 此处是封装的layer.handler(req, res, next)
        // 那么layer.handler函数是谁呢?从Router的路由数组中的layer实例中找
        // layer实例是通过new Layer实例化得来的, 所以layer.handler就是route.dispatch方法
        layer.handle_request(req, res, next);
      }
      
    } else {
      next()
    }
  }
  next()
}

module.exports = Router;