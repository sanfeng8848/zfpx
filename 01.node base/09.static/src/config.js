// 参数的规范: 项目名static:模块名config  --> static:config
let debug = require('debug')('static:config')
let config = {
  host: 'localhost',
  port: 8080,
  root: process.cwd()
}
debug(config)
module.exports = config;