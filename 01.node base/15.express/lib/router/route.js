const Layer = require('./layer')
const methods = require('methods')
const slice = Array.prototype.slice;

function Route (path) {
  this.path = path;
  this.stack = []
  // 表示此路由有此方法的处理函数 GET POST...
  this.methods = {}
}

// 判断路由中是否有对应的请求方法 ex: app.route('/user').get(fn1).post(fn2)
// 即,/user 这个路径的路由layer中, 是否有get,post方法
Route.prototype.handle_method = function (method) {
  method = method.toLowerCase();    // 兼容处理
  return this.methods[method]
}

methods.forEach(function (method) {
  // 在router/index.js中 调用的时候, 就没有传递path --> route[method].apply(route, slice(arguments, 1)), 剪掉了arguments的第一个参数
  Route.prototype[method] = function () {  // path就去掉了
    // 所有的处理函数
    let handlers = slice.call(arguments);
    this.methods[method] = true;
    for (let i = 0; i < handlers.length; i++) {
      let layer = new Layer('/', handlers[i])
      layer.method = method;
      this.stack.push(layer)
    }
    return this;      // 可以链式调用 app.route(''/user'),get(fn1).post(fn2)
  }
})

// Route.prototype.get = function (handler) {
//   let layer = new Layer('/', handler)
//   layer.method = 'get';
//   this.methods['get'] = true;
//   this.stack.push(layer)
// }

// 一个layer内部, 不同的方法+处理方法的调用, 内部要多次调用next
Route.prototype.dispatch = function (req, res, out) {
  // TODO
  // 为什么此处要缓存this? 因为在下面调用next()时,是直接调用的, 调用对象是全局对象了, 
  // next函数内部的this就不是Route实例了, 所以需要缓存
  let idx = 0, self = this;
  // 执行当前路由的下一个处理函数
  function next (err) {
    // 如果在路由函数中出错了,则会跳过当前的路由, 然后执行Router数组中的下一个路由,即执行下一个layer
    // 流程走到了/router/index.js中 handle方法中的next函数
    if (err) {
      return out(err);
    }
    if (idx >= self.stack.length) {
      return out();      // route.dispatch里的out就是Router的next
    }
    let layer = self.stack[idx++]
    if (layer.method == req.method.toLowerCase()) {
      layer.handle_request(req, res, next)
    } else {
      next()
    }
  }
  next();
}

module.exports = Route;