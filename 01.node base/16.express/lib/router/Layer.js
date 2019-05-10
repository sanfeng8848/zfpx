function Layer (path, fn) {
  this.path = path;
  this.name = fn.name || 'anonymouse';
  this.handler = fn;
}

// 路由的路径匹配
Layer.prototype.match = function (path) {
  if (path === this.path || path === '*') {
    return true;
  }
  return false;
}

// 路由条件满足时执行路由
Layer.prototype.handle_request = function (req, res) {
  if (this.handler) {
    this.handler(req, res)
  }
}

module.exports = Layer;