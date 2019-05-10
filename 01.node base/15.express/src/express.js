const http = require('http')
const mixin = require('merge-descriptors')

const proto = Object.create(null)
// 在proto对象上添加listen
proto.listen = function () {
  let server = http.createServer(this);  // 当用app.listen调用的时候, this就是app
  server.listen(...arguments)
}

module.exports = function Application () {
  let app = function (req, res) {
    res.end('Response From Server!!!')
  }
  
  // 将proto上的属性和方法merge到app对象上
  mixin(app, proto, false)
  return app;
}

