// express库模拟
/**
 * 1. listen方法: 创建server实例, 挂载监听处理函数app
 * 2. (在请求处理函数上挂载属性和方法)
 * 3. 添加路由规则
 * 4. 添加中间件
 * 5. 在请求处理函数中遍历路由和中间件, 调用路由或中间件的处理函数
 * 6. 增加错误处理中间件的处理逻辑, 当中间件调用带有参数的next('出错了'), 流程会调用4个参数的中间件
 */
let http = require('http')
let url = require('url')

function CreateApplication() {
  // 监听请求处理函数, 入参: req, res
  let app = function (req, res) {
    let { pathname } = url.parse(req.url, true)
    if (pathname.includes('/favicon')) return;
    // 路由和中间件的处理方式不同, 判断
    let index = 0
    let next = function (err) {
      // 递归的边界条件
      if (index >= app.routes.length) {
        return res.end(`Cannot ${req.method} / ${pathname}`)
      }
      // 取出第一个路由或者中间件
      let route = app.routes[index++]
      if (err) {
        if (route.method == 'middle') {
          if ((route.path == '/' || pathname.startsWith(route.path + '/') || pathname == route.path)) {
            if (route.handler.length == 4) {
              route.handler(err, req, res, next)
            } else {
              next(err)
            }
          } else {
            next(err)
          }
        } else {
          next(err)
        }
      } else {
        // 如果是middle,要判断路径是否匹配
        if (route.method === 'middle') {
          if (route.path == '/' || pathname.startsWith(route.path + '/') || pathname == route.path) {
            route.handler(req, res, next)   // next没有参数, 并且满足中间件的所有条件, 流程执行到3个参数的处理函数中去
          } else {
            next()
          }
        } else {    // 如果是路由
          if (route.paramsName) {   // 如有路径参数,开始匹配路径与数组
            let matchers = pathname.match(route.reg_path)
            // console.log(matchers);
            if (matchers) {
              // 如果匹配上了, 把占位符和实际请求的值保存起来
              let params = {}
              for (let i = 0; i < route.paramsName.length; i++) {
                params[route.paramsName[i]] = matchers[i+1]
              }
              req.params= params
              // 处理 请求函数
              // 在调用路径参数的请求前, 如果有公共方法调用,就先调用,然后再调用请求的handler
              // 遍历paramsHandler存储的param请求
              for (let j = 0; j < route.paramsName.length; j++) {
                let name = route.paramsName[j]
                let handler = app.paramsHandler[name]
                if (handler) {
                  // app.param('userid', (req, res, next, userid) {})
                  // next: () => route.handler(req, res) 执行完公共方法之后的请求函数
                  // req.params[name]: 路径参数的内容 --》 req.params['userid'] ==> userid
                  return handler(req, res, () => route.handler(req, res), req.params[name])
                }
              }
            } else {  // 没有路径参数的, 执行下一个
              next()
            }
          } else {
            if ((route.method == req.method.toLowerCase() || route.method == 'all') &&
              (route.path == pathname || route.path == '*')) {
              route.handler(req, res)
            } else {
              next()
            }
          }
        }
      }

    }
    next()
  }

  // 处理特殊的param, 抽取公共的处理方法
  // 1. 对于调用 app.param('userid', (req, res, next, userid)  => {}) 需要保存起来key-value
  app.paramsHandler = {}
  app.param = function (name, handler) {
    app.paramsHandler[name] = handler
  }

  ///////////////////////////// 处理路由 /////////////////////////////
  // 路由规则
  app.routes = []
  // http所有请求方法
  http.METHODS.forEach(method => {
    method = method.toLowerCase()

    app[method] = function (path, handler) {
      // 保留最初的路由规则(method, path, handler), 然后处理路径参数, 实现对layer的有条件的重写
      const layer = { method, path, handler }
      // 判断是否有路径参数 类似 /user/:name/:age 
      if (path.includes(':')) {
        let paramsName = []
        // 1. 将路径转换为正则
        // 2. 提取占位符的变量名
        path = path.replace(/:([^\/]+)/g, function () {
          // 回调函数的参数arguments有4个, 1: 匹配的字符串 2. 分组内容(占位符变量)
          paramsName.push(arguments[1])
          return '([^\/]+)'     // 意义在于把冒号去掉, 因为实际请求的路径应该是这样的 /user/sanfeng/30
        })
        // layer.path = new RegExp(path)
        layer.reg_path = new RegExp(path)
        layer.paramsName = paramsName
      }
      app.routes.push(layer)
    }
  })

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

  // 内部实现的中间件处理请求路径的处理
  app.use(function (req, res, next) {
    let urlObj = url.parse(req.url, true)
    req.query = urlObj.query
    req.path = urlObj.pathname
    req.hostname = req.headers['host'].split(':')[0]
    next()
  })


  app.listen = function () {
    let server = http.createServer(app)
    server.listen.apply(server, arguments)
  }
  return app;
}

module.exports = CreateApplication;
