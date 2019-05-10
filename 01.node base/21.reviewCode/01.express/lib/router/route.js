let Layer = require('./layer')
let slice = Array.prototype.slice;
let methods = require('methods')

function Route(path) {
  this.path = path;
  this.methods = {};
  this.stack = []   // 路由的一层, 可能包含了相同路径下的多个处理函数
}

methods.forEach(function (method) {
  Route.prototype[method] = function () {
    let handlers = slice.call(arguments)
    for (let i = 0; i < handlers.length; i++) {
      let layer = new Layer('/', handlers[i])
      layer.method = method
      this.methods[method] = true
      this.stack.push(layer)
    }
    return this
  }
})
// Route.prototype.get = function () {
//   let handlers = slice.call(arguments)
//   for (let i = 0; i < handlers.length; i++) {
//     // 一个处理函数就是一层, 是Router内一层的嵌套层
//     let layer = new Layer('/', handlers[i])
//     layer.method = 'get'
//     this.methods['get'] = true
//     this.stack.push(layer)
//   }
//   return this;      // 返回最外层的一层
// }

Route.prototype.handle_method = function (method) {
  method = method.toLowerCase()
  return this.methods[method]
}

// 执行当前路径中的下一个函数 app.get('/', fn1, fn2...)
Route.prototype.dispatch = function (req, res, out) {
  let idx = 0, self = this;
  function next(err) {
    if (err) {
      return out(err)
    }
    if (idx >= self.stack.length) {
      return out()     // 一个路由层最后的out 就是Router中的一个层的next
    }
    let layer = self.stack[idx++]
    if (layer.method == req.method.toLowerCase()) {
      layer.handle_request(req, res, next)
    } else {
      next()
    }
  }
  next()
}
module.exports = Route;