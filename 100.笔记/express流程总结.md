```js
createApplication () {
  return new Application()
}
module.exports = createApplication;   // express函数 测试用例中调用express方法返回app实例
```
- application.js
```js
// 构造函数
const Router = require('./router/index.js')
function Application () {}
Application.prototype.lazyrouter = function () {
  if (!this._router) {
    this._router = new Router()
  }
}
Application.prototype.get = function (path, handler) {
  // 将app的请求方法转嫁给路由实例去处理 应用于路由解耦合
  this.lazyrouter()
  this._router.get(path, handler)
}

Applicaiton.prototype.listen = function () {
  let that = this;  // 保留app的this引用,用于内部函数引用app实例上的属性或者方法
  let server = http.createServer((req, res) => {
    function done () {
      res.end(`cannot ${req.method} ${req.url}`)
    }
    // 把所有的关于路由的操作(遍历路由,子路由)交给路由系统,解耦合
    this._router.handle(req, res, done)
  })
  server.listen(...arguments)
}
```

- router/index.js
```js
function Router() {

}
Router.prototype.get = function (path, handler) {
  // 创建路由实例并且添加一层, 这个功能整合到route方法里
  let route = this.route(path)
  route.get(handler)    // 向Route里添加一层
}
Router.prototype.route = function (path) {
  let route = new Route(path)
  let layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route;
  this.stack.push(layer)
  return route;
}
```

### router/index.js
- 改造构造函数为一个函数
> 为什么要改造成一个函数,并且返回的函数的参数还是3个参数req, res, next
> 因为: app.use('/user', userRouter); 子路由实例放在了app.use()函数的第二个参数上,
> 第二个参数就是一个函数,并且这个函数接受的参数就是(req,res,next)
```js
function Router () {
  this.stack = []
}
// 改造后
function Router () {
  function router (req, res, next) {
  }
  Object.setPrototypeOf(router, proto)
  router.stack = [];
  return router;
}
proto.route = function (path) {
  let route = new Route(path)
  let layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route;
  this.stack.push(layer)
  return route;
}

methods.forEach(method => {
  proto[method] = function (path) {
    let route = this.route(path)
    route[method].apply(route, slice(arguments, 1))
    return this;
  }
})

```

### 中间件处理
- app.use(path, handler) app的use方法交给router实例处理
```js
// 添加中间件, 而中间件和普通的路由都是放在一个数组中的, 放在this._router.stack
Application.prototype.use = function () { // 函数的参数通传(全部传递给函数内部的函数)
  this.lazyrouter()
  this._router.use.apply(this._router, arguments)
}
```
- 路由实例方法
```js
proto.use = function (path, handler) {
  if (typeof handler != 'function') {
    handler = path;
    path = '/'
  }
  let layer = new Layer(path, handler)
  layer.route = undefined
  this._router.stack.push(layer)
}
```

- 修改router的handle方法,用于兼容中间件
```js
/**
 * 1. 处理中间件
 * 2. 处理子路径
 * /
proto.handle = function 
```