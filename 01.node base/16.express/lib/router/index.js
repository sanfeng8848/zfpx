const url = require('url')
const Layer = require('./Layer')

module.exports = Router;

function Router () {
  this._router = [new Layer('*',function (req, res) {
    res.writeHead(200, {
      "Content-Type": 'text/plain;charset=utf8'
    })
    res.end('404')
  })]
}

Router.prototype.get = function (path, handle) {
  this._router.push(new Layer(path, handle))
}

Router.prototype.handle = function (req, res) {
  let { pathname } = url.parse(req.url, true)
  for (let i = 1; i < this._router.length; i++) {
    if (this._router[i].match(pathname)) {
      return this._router[i].handle_request(req, res)
    }
  }
  // 没有匹配,执行默认路由
  return this._router[0].handle_request(req, res)
}