// 创建一个静态资源服务器
const http = require('http')
const config = require('./config.js')
const chalk = require('chalk')
// const debug = require('debug')('static:app')
// process.env.debug='static:app'
process.env.debug='static:app';
console.log(process.env.debug);

let debug = require('debug')('static:app');

class Server {
  constructor () {

  }
  start () {
    let server = http.createServer()
    server.on('request', this.request.bind(this))  // bind this是为了保证在request函数中this是Server类的实例
    server.listen(config.port, () => {
      let url = `${config.host}: ${config.port}`
      debug(`server started at ${chalk.green(url)}`)
      // console.log(`server started at ${chalk.green(url)}`)
    })
  }

  async request (req, res) {

  }

}

let server = new Server()
server.start()