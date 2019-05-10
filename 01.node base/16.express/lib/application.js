const http = require('http')
const Router = require('./router')

module.exports = {
  _router: new Router(),
  get: function (path, handle) {
    this._router.get(path, handle)
  },
  put: function (path, handle) {
    this._router.get(path, handle)
  },
  listen: function () {
    let that = this;
    let server = http.createServer(function (req, res) {
      if (!res.send) {
        res.send = function (body) {
          res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf8'
          })
          res.end(body)
        }
      }
      // 在请求处理函数中, 处理路由以及中间件
      return that._router.handle(req, res);      // router实例应该具有handler方法,参数req,res
    })
    server.listen(...arguments);
  }
}