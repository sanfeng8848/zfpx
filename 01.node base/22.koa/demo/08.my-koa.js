let http = require('http')

class Koa {
  constructor () {
    this.middlewares = []
  }
  use (fn) {
    this.middlewares.push(fn)
  }
  listen () {
    let that = this;
    let server = http.createServer((req, res) => {
      let ctx = { req, res }
      dispatch(0)
      function dispatch (idx) {
        that.middlewares[idx](ctx, () => dispatch(idx + 1))
      }
    })
    server.listen(...arguments)
  }
}

module.exports = Koa;