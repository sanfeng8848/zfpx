// express库模拟
/**
 * 1. listen方法: 创建server实例, 挂载监听处理函数app
 * 2. (在请求处理函数上挂载属性和方法)
 * 3. 添加路由规则
 * 4. 添加中间件
 * 5. 在请求处理函数中遍历路由和中间件, 调用路由或中间件的处理函数
 */
let http = require('http')
let url = require('url')

function CreateApplication () {
  // 监听请求处理函数, 入参: req, res
  let app = function (req, res) {
    let { pathname } = url.parse(req.url, true)
    if (pathname.includes('/favicon')) return;
    let method = req.method.toLowerCase()
    // 请求方法和路径匹配成功, 才执行对应的处理函数
    // forEach不能退出循环, 使用some(), 内部return true 即可退出
    app.routes.some(route => {
      if ( (route.method == method || route.method == 'all')
            && (route.path == pathname || route.path == '*') ) {
        route.handler(req, res)
        console.log('some....');
        return true;
      }
    })
    // 没有匹配到就返回没找到即可
    res.end(`Cannnot ${req.method}/${pathname}`)
  }

  ///////////////////////////// 处理路由 /////////////////////////////
  // 路由规则
  app.routes = []
  // http所有请求方法
  http.METHODS.forEach(method => {
    method = method.toLowerCase()
    app[method] = function (path, handler) {
      app.routes.push({
        method,
        path,
        handler
      })
    }
  })

  // 根据不同方法, 路径, 添加路由规则
  // app.get = function (path, handler) {
  //   app.routes.push({
  //     method: 'get',
  //     path,
  //     handler
  //   })
  // }

  // 同一个路径, 可以匹配所有请求方法
  app.all = function (path, handler) {
    app.routes.push({
      method: 'all',
      path,
      handler
    })
  }

  ///////////////////////////// 处理中间件 /////////////////////////////
  app.use = function (path, handler) {
    // 兼容性处理, 因为path可传可不传的参数, 那么判断handler是不是函数就可以判断是否传递的是两个param还是一个
    if (typeof handler !== 'function') {    // 也就是undefined, 说明use函数只传递了处理函数
      handler = path;   // 此时path就是处理函数, 将use函数的第一个参数path赋值给真正意义上的处理函数的变量handler
      path = '/'        // 给真正意义上的路径path, 设置默认值, 根路径
    }
    // 调用use方法, 将中间件函数添加到路由表中(路由和中间件合并为一个[简单考虑],因为在app函数中, 直接遍历一个数组即可)
    app.routes.push({
      method: 'middle',     // 中间件的处理方法-->middle, 只是为了区分哪些是中间件的处理对象(函数)
      path,
      handler
    })
  }


  app.listen = function () {
    let server = http.createServer(app)
    server.listen.apply(server, arguments)
  }
  return app;
}

module.exports = CreateApplication;
