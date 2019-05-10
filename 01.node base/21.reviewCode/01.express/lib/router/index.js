// 路由容器的主入口, 也包含了中间件
let url = require('url')
let methods = require('methods')
let Layer = require('./layer')
let Route = require('./route')
let slice = Array.prototype.slice;
function Router() {
  function router(req, res, next) {
    console.log(router);
    router.handle(req, res, next)
  }
  Object.setPrototypeOf(router, proto)    // 把路由的原型方法 转移给router内部函数, 原型继承
  router.stack = []
  // 缓存param参数以及对应的处理函数数组 {"uid": [fn1, fn2], "product": ['fn3, fn4]}
  router.paramsCallback = {}      
  // 返回的是函数的定义 fn: router(req, res, next), 当调用app.use('/user', user)时调用这个router函数
  return router;
}
let proto = Object.create(null)

methods.forEach(function (method) {
  proto[method] = function (path) {
    let route = this.route(path)
    route[method].apply(route, slice.call(arguments, 1))    // 把所有的处理函数传递给route[method]
    return this;
  }
})

// 唯一确定的是请求方法和路径, 所以path作为参数, 处理函数可能有多个fn1, fn2...
// Router.prototype.get = function (path) {  
//   //创建路由,并且创建一个layer,把layer push到this.stack 总的路由栈数组中,并返回当前路由
//   let route = this.route(path);
//   // route已经确定了route的路径,下面就是处理将对应的请求方法的所有处理函数放入stack中
//   route.get.apply(route, slice.call(arguments, 1))
//   return this;
// }
// 创建路由系统
proto.route = function (path) {
  // 返回请求路径 /user, method {'GET': true, 'POST': true }, stack: []
  let route = new Route(path);
  // 根据创建的路由以及处理函数, 创建一个layer: /user, {'get': true}, stack: [fn1, fn2...]
  let layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route
  this.stack.push(layer)
  return route;
}

// 路由系统中添加中间件, 路径+处理函数, 其中路径path是可选的
proto.use = function (path, handler) {
  // 如果中间件没有路径, handler就是undefined, 也就是!='function'
  if (typeof handler != 'function') {
    handler = path;
    path = '/'
  }
  // 中间件也需要创建一层
  let layer = new Layer(path, handler)
  layer.route = undefined       // 因为中间件是没有请求方法的, 也就是没有method
  this.stack.push(layer)
}

proto.param = function (name, handler) {
  if (!this.paramsCallback[name]) {
    this.paramsCallback[name] = []
  }
  this.paramsCallback[name].push(handler)
}

// 处理中间件的handle
proto.handle = function (req, res, out) {
  let idx = 0, self = this, removed = '';
  let { pathname } = url.parse(req.url, true)
  function next(err) {
    if (removed.length > 0) {
      req.url = removed + req.url;
      removed = ''
    }
    if (idx >= self.stack.length) {
      return out(err)
    }
    let layer = self.stack[idx++]
    // 如果路径匹配
    if (layer.match(pathname)) {
      // 中间件 如果路由数组中的一层没有route属性
      if (!layer.route) {
        removed = layer.path
        req.url = req.url.slice(removed.length);   // 截取 路由的前缀
        if (err) {
          layer.handle_error(err, req, res, next)
        } else {
          layer.handle_request(req, res, next)
        }
      } else {
        // 否则就是路由
        if (layer.route && layer.route.handle_method(req.method)) {
          req.params = layer.params;
          self.process_params(layer, req, res, () => {
            layer.handle_request(req, res, next)
          })
        } else {
          next(err)
        }
      }
    } else {
      next(err)
    }
  }
  next()
}

proto.process_params = function (layer, req, res, out) {
  let keys = layer.keys;
  let self = this;
  //用来处理路径参数
  let paramIndex = 0 /**key索引**/, key/**key对象**/, name/**key的值**/, val, callbacks, callback;
  //调用一次param意味着处理一个路径参数
  function param() {
      if (paramIndex >= keys.length) {
          return out();
      }
      key = keys[paramIndex++];//先取出当前的key
      name = key.name;// uid
      val = layer.params[name];
      callbacks = self.paramsCallback[name];// 取出等待执行的回调函数数组
      if (!val || !callbacks) {//如果当前的key没有值，或者没有对应的回调就直接处理下一个key
          return param();
      }
      execCallback();
  }
  let callbackIndex = 0;
  function execCallback() {
      callback = callbacks[callbackIndex++];
      if (!callback) {
          return param();//如果此key已经没有回调等待执行，则意味本key处理完毕，该执行一下key
      }
      callback(req, res, execCallback, val, name);
  }
  param();
}
// 执行下一个路径层
// proto.handle = function (req, res, out) {
//   let idx = 0, self = this;
//   let { pathname } = url.parse(req.url, true)
//   function next(err) {
//     if (idx >= self.stack.length) {
//       return out()
//     }
//     let layer = self.stack[idx++]
//     // 1. 匹配路径,给layer加方法 match, 为什么是给layer加方法?因为是路由系统中的一层,给这一层加match来判断路径和方法
//     // 2. 查看这个layer中是否有route 
//     // 3. 查看layer中的route中是否有对应的请求方法(get, post...)
//     if (layer.match(pathname) && layer.route && layer.route.handle_method(req.method)) {
//       if (err) {
//         layer.handle_error(err, req, res, next);
//       } else {
//         layer.handle_request(req, res, next);
//       }
//     } else {
//       // 没有匹配,走下一个Router总路由系统的下一个layer
//       next()
//     }
//   }
//   next()
// }

module.exports = Router;