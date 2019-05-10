/**
 * express-session默认采用memorycache, 本模块使用的是文件存储,也可以使用redis,mongo等多种存储方式
 * 1. 继承express-session中的Store
 */
let util = require('util')
let mkdirp = require('mkdirp')
let path = require('path')
let fs = require('fs')

module.exports = function (session) {
  function FileStore(options) {
    let { root } = options;
    this.root = root;
    // this.maxAge = maxAge;
    mkdirp.sync(root)     // 级联创建目录
  }

  // 让FileStore构造函数继承session中的Store,并实现set get destroy方法
  util.inherits(FileStore, session.Store)

  // 获取文件路径以及sessionID为名称的文件
  FileStore.prototype.resolve = function (sid) {
    return path.join(this.root, sid + '.json')
  }

  // 将session写入到指定目录root下的文件中
  FileStore.prototype.set = function (sid, session, callback) {
    console.log("session --> ", session)
    // fs.writeFile(this.resolve(sid), JSON.stringify(session), callback)
    fs.writeFile(this.resolve(sid), JSON.stringify(session), callback)
  }

  FileStore.prototype.get = function (sid, callback) {
    fs.readFile(this.resolve(sid), 'utf8', (err, data) => {
      if (err) callback(err)
      console.log("data", data)
      // 读文件之后是字符串, 然后转换为对象
      data = JSON.parse(data)
      callback(null, data)
    })
  }

  FileStore.prototype.destory = function (sid, callback) {
    fs.unlink(this.resolve(sid), callback)
  }
  return FileStore;
}
