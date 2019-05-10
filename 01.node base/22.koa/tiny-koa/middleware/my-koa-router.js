class Layer {
  constructor (path, method, handler) {
    this.path = path;
    this.method = method;
    this.handler = handler
  }
  match (curPath) {
    debugger
    if (curPath === this.path) {
      return true;
    } else {
      return false;
    }
    
  }
}
class Router {
  constructor () {
    this.stack = []
  }
  all (path, handler) {
    let route = new Layer(path, 'all', handler)
    this.stack.push(route)
  }
  // 根据给定的路径返回命中的路由
  getMatchRoutes (curPath) {
    return this.stack.filter(item => {
      return item.match(curPath)
    }).map(_ => _.handler)
  }

  compose (routes, ctx) {
    return dispatch(0)
    // 功能: 包裹想要的路由或者一个空路由
    function dispatch (i) {
      let route = routes[i]
      if (!route) {
        return Promise.resolve()
      }
      return route(ctx, function () {
        return dispatch(i+1)
      })
    }
  }

  // 将各个路由加入到中间件中
  routes () {
    return async (ctx, next) => {
      let routes = this.getMatchRoutes(ctx.path)
      if (!routes) {
        return next()
      }
      let fnRouters = this.compose(routes, ctx)
      fnRouters.then(() => {
        // 将执行的权限交给下一个中间件
        return next()
      }).catch((err) => {
        console.log(err);
      })
      // debugger
      // 1. 判断哪些路由命中了当前的规则
      // 2. 管理路由
    }
  }
}

module.exports = Router;




