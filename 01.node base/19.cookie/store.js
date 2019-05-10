let mkdirp = require('mkdirp')
let util = require('util')
let fs = require('fs')
let path = require('path')
// TODO: express-session的源码中的Store这个构造函数
module.exports = function (session) {
  let Store = session.Store;
  util.inherits(FileStore, Store)   // FileStore构造函数原型继承session模块的Store
  function FileStore(options) {
    let { root, maxAge } = options;
    this.root = root;
    this._maxAge = maxAge || 0;
    mkdirp.sync(this.root)
  }
  FileStore.prototype.resolve = function (sid) {
    return path.join(this.root, sid + '.json')
  }
  // 把session写入文件
  FileStore.prototype.set = function (sid, session, callback) {
    fs.writeFile(this.resolve(sid), JSON.stringify(session), callback)
  }
  FileStore.prototype.get = function (sid, callback) {
    fs.readFile(this.resolve(sid), 'utf8', (err, data) => {
      if (err) callback(err)
      data = JSON.parse(data)
      callback(null, data)
    })
  }
  FileStore.prototype.destory = function (sid, callback) {
    fs.unlink(this.resolve(sid), callback);
  }
  return FileStore;
}