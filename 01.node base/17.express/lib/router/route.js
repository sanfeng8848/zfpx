const Layer = require('./layer')
const methods = require('methods')
const slice = Array.prototype.slice;
function Route (path) {
  this.path = path;
  this.stack = [];
  this.methods = {}
}

// 此处处理的是多次调用 app.get('/user', fn1);
// app.get('/user', fn2);
methods.forEach(method => {
  Route.prototype[method] = function () {
    // 所有的处理函数
    let handlers = slice.call(arguments)
    console.log('handlers:', handlers);
    this.methods[method] = true;
    // 循环遍历所有的处理函数, 有一个函数就是一个layer
    // 此处的handlers是路径分组中的处理函数
    for (let i = 0; i < handlers.length; i++) {
      let layer = new Layer('/', handlers[i])
      layer.method = method;
      this.stack.push(layer)
    }
    console.log('route.stack', this.stack)
    return this;
  }
})

Route.prototype.handle_method = function (method) {
  method = method.toLowerCase()
  return this.methods[method]
}

// 路径分组下的多次调用处理函数
Route.prototype.dispatch = function (req, res, out) {
  let idx = 0, self = this;
  // 执行当前路由的下一个处理函数 app.route('/user', fn1, fn2,...)
  function next (err) {
    if (err) {
      return out(err);    // 如果在路由函数中出错了 则会跳过当前路由 去执行router中的下一个layer
    }
    if (idx >= self.stack.length) {
      return out()
    }
    let layer = self.stack[idx++];
    if (layer.method == req.method.toLowerCase()) {
      layer.handle_request(req, res, next)
    } else {
      next()
    }
  }
  next()
}

module.exports = Route;