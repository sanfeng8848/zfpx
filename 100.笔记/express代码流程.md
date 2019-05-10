### 路由
1. express.js
```js
const Application = require('./application');   // 模块返回的是构造函数,可以new

function createApplication () {
  return new Application();   // 返回Application的实例
}
```

2. application.js
> 创建构造函数
```js
function Application () {
}
```
> application.js: 接受用户浏览器的各种请求方法 
# 当且仅当有GET,POST...请求方法的时候,才创建路由系统(new Router())
```js
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
```

> application.js: 初始化路由系统 
```js
Application.prototype.lazyrouter = function () {
  if (!this._router) {
    this._router = new Router();
  }
}
```

> application.js 
路由接收的方法请求: `this._router[method].apply(this._router, slice.call(arguments))`

> router/index.js
```js
methods.forEach((method) => {
  Router.prototype[method]=function (path) {
    let route = this.route(path)
    // ...
  }
})
```

> router/index.js
```js
// this.route(path)
Router.prototype.route = function (path) {
  // 初始化路由
  let route = new Route(path);  // ...下一级扩展
  // let layer = new Layer(path, ?) // ?...

}
```

> router/route.js
```js
function Route (path) {
  this.path = path;
  this.stack = []
  this.methods = {}
}
```

```js
Router.prototype.route = function (path) {
  // let route = new Route(path) ...
  let layer = new Layer(path, route.dispatch.bind(route)) // TODO: 待实现 route.dispatch
  layer.route = route
  this.stack.push(layer)
  return route
}
```

> router/layer.js
```js
function Layer (path, handler) {
  this.path = path;
  this.handler = handler;
}
```


### express源码中的核心概念
- Router.prototype.handle中的layer
> 此处的layer是最外层的路由,指的是外层路由
```js
app.get('/user', function (req, res, next) {
  res.end('user');
  next()
})
app.get('/product', function (req, res, next) {
  res.end('product');
  next()
})
app.post('/userinfo', function (req, res, next) {
  res.end('register success..');
  next()
})

```
> 比如,如下代码中, layer,外层路由指的是
```js
function Layer (path, handler) {
  this.path = path;
  this.handler = handler;
}
```
> 将上面的测试代码中的3个外层layer加入到
```js
let layer = new Layer(path, route.dispatch.bind(route))
```



