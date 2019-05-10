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
  layer.route = undefined;    // 设置中间件没有路由属性
  this.stack.push(layer)
}

// 最外层的路由
proto.handle = function (req, res, out) {
  let idx = 0, self = this;
  let slashAdded = false,     // 是否添加过 /
      removed = '';           // 被移除的字符串
  let { pathname } = url.parse(req.url, true)
  function next (err) {
    if (removed.length > 0) {
      req.url = removed + req.url;
      removed = ''
    }
    if (idx >= self.stack.length) {
      // 当遍历所有路由之后,就调用实参函数 Application.prototype.listen方法中的done函数
      return out();
    }
    let layer = self.stack[idx++];  // 此处的layer是外层路由 或者中间件
    if (layer.match(pathname)) {      // 在layer的match方法中处理路由的完全匹配和中间件的前缀匹配规则
      if (!layer.route) {                         // 没有route,说明是中间件层
        removed = layer.path          // 外层中间件的路径,
        req.url = req.url.slice(removed.length)     // 子路由要去掉主路由系统中添加的路径
        if (err) {
          layer.handle_error(err, req, res, next)
        } else {
          layer.handle_request(req, res, next)
        }
      } else {                                    // 路由匹配
        // 再判断路由以及请求方法 是否存在
        if (layer.route && layer.route.handle_method(req.method)) {
          layer.handle_request(req, res, next)
        } else {
          next()
        }
      }
    } else {
      next()      // 路径没有匹配, next
    }
  }
  next()
}

module.exports = Router;