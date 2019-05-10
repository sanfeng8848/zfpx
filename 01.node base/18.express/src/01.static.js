// 模拟内置静态资源文件中间件, 会拦截所有客户端的请求, 然后去静态资源根目录下面找对应的文件
// 如有则返回给客户端, 没有就执行下一个中间件

const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
/**
 * 
 * @param {静态资源根目录} root 
 * @param {*} options 
 * 1. 所有的中间模块(此处就是一个模块)都是一个方法(static方法,并导出)
 * 2. 然后调用模块方法(static)会返回一个中间件函数return function (req, res, next) {...}
 * 3. 为什么要这么设计呢? 
 *  1. 这是一个闭包, 为了传递参数
 *  2. 外面要包一层, 外层函数接受实际的业务参数,比如静态资源目录
 *  3. 内部嵌套函数, 使用外层函数的参数,形成闭包, 内部函数的参数满足中间件的参数标准function (req, res, next)
 */
function static(root, options = {}) {
  return function(req, res, next) {
    let { pathname } = url.parse(req.url, true)   // pathname = /index.html
    let file = path.join(root, pathname)          // 文件的绝对路径(如果是资源文件),也可能是路由路径
    fs.stat(file, (err, stat) => {
      // 如果报错, 路径下没有这个文件, 说明是路由或者中间件,调用express的next进行处理
      if (err) {
        next()
      } else {
        // 是文件
        let contentType = mime.getType(pathname)
        res.setHeader('Content-Type', contentType)
        fs.createReadStream(file).pipe(res)
      }
    })
  }
}

module.exports = static