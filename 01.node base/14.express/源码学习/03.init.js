const http = require('http')
const mixin = require('merge-descriptors')

module.exports = createApplication;

function createApplication () {
  let app = function (req, res) {
    res.end('response end')
  }
  mixin(app, proto, false)
  return app;
}

const proto = Object.create(null)
proto.listen = function (port) {
  let server = http.createServer(this)
  return server.listen.apply(server, arguments)
}