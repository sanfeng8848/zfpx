const Application = require('./application')  // 返回构造函数
const Router = require('./router')

function createApplication () {
  return new Application()      // 调用构造函数实例化对象 app
}
createApplication.Router = Router;
module.exports = createApplication;