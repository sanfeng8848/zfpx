let pathToRegexp = require('path-to-regexp')
function Layer (path, handler) {
  this.path = path;
  this.handler = handler;
  //  [ { name: 'uid', optional: false, offset: 6 } ]
  this.keys = [];
  // 调用pathToRegexp返回匹配的正则 /user/(?:([^/]+?))
  this.regexp = pathToRegexp(this.path, this.keys)
}

Layer.prototype.match = function (path) {
  // 无论是路由还是中间件,粗狂的完全匹配,肯定是正确的(包含了路由和中间件)
  if (this.path == path) {
    return true;
  }
  // 如果是中间件, 匹配前缀
  if (!this.route) {
    return path.startsWith(this.path + '/')
  }
  // 如果这个layer是个路由Layer, 要处理params
  if (this.route) {
    // 使用正则与参数path进行匹配
    // [ '/user/hello','hello',index: 0,input: '/user/hello',groups: undefined ]
    let matches = this.regexp.exec(path)
    console.log("matches -> ", matches);
    if (matches) {
      this.params = {}
      for (let i = 1; i < matches.length; i++) {
        let name = this.keys[i-1].name
        let val = matches[i]
        this.params[name] = val
      }
      console.log("this.params ", this.params);
      return true;
    }
  }
  return false
}
Layer.prototype.handle_request = function (req, res, next) {
  this.handler(req, res, next)
}

Layer.prototype.handle_error = function (err, req, res, next) {
  // 如果下一层不是错误处理的一层,应该继续往下走
  if (this.handler.length != 4) {
    return next(err)
  }
  this.handler(err, req, res, next);
}

module.exports = Layer;