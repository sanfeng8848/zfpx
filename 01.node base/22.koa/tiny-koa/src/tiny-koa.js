let http = require('http')
const Stream = require('stream')
let url = require('url')
module.exports = class TinyKoa {
  constructor () {
    this.middlewares = []
  }

  use (fn) {
    this.middlewares.push(fn)
  }
  // 返回的是一个函数,因为返回值可以调用fnMiddleware()
  // 调用之后返回的是promise, 因为调用结束后使用了then
  compose (middlewares, ctx) {
    return function () {
      return dispatch(0)
      function dispatch (i) {
        let fn = middlewares[i]
        if (!fn) return Promise.resolve()

        return fn(ctx, function next () {
          return dispatch(i+1)
        })
      }
      /* 这是手工过程, 需要递归过程  调用compose, 希望首先调用第一个中间件, 中间件内传递ctx和下一个中间件,
      下一个中间件再返回下一个中间件的执行和next 2的中间件
      return middlewares[i](ctx, function next () {
        return middlewares[i+1](ctx, function next () {
          return middlewares[i+2](ctx, function () {
            return Promise.resolve()
          })
        })
      })
      */
    }
  }

  handleResponse (ctx) {
    let { req, res, body } = ctx
    if (typeof body === 'string') {
      res.end(body)
    } else if (body instanceof Stream) {
      body.pipe(res)
    }
  }
  listen (port, callback) {
    let server = http.createServer((req, res) => {
      let ctx = {};
      ctx.req = req;
      ctx.res = res;
      ctx.path = url.parse(req.url).pathname;
      // fnMiddleware 是一个函数, 返回的是promise,但是希望返回的是第一个中间件的运行
      let fnMiddleware = this.compose(this.middlewares, ctx)
      fnMiddleware().then(() => {
        this.handleResponse(ctx)
      }).catch((err) => {
        console.log(err)
      })
    })
    server.listen(port, callback)
  }
}