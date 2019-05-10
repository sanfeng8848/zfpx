const http = require('http')

const Application = require('./application')

function createApplication () {
  return new Application();   // 返回Application的实例
}

module.exports = createApplication;