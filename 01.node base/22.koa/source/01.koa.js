/**
 * https://segmentfault.com/a/1190000013650376
 * 
 * 1. listen(...args)
 * 2. http.createServer(this.callback());
 */


let http = require('http')

class Koa {
  listen (...args) {
    let server = http.createServer(this.callback())
    server.listen(...args)
  }
  callback () {
    return function (req, res) {
      res.end('hello world')
    }
  }
}

let app = new Koa()
app.listen(8080, () => {
  console.log('start...');
})
