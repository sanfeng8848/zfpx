/*
 加载require模块的思路
 1. 根据路径查找文件
 2. fs.readFileSync 同步读取文件
 3. 将读取到的文件内容(字符串) 包装到一个自执行函数中, 并且返回被加载模块中的module.exports对象(此对象定义的是导出属性和方法)
 4. 定义构造函数, 并且初始化一个exports属性
 */

function MyRequre(path) {

  function Module() {
    this.exports = {};
  }

  var fs = require('fs');

  var source = fs.readFileSync(path, 'utf8');

  var package = "(function(exports,module){" + source + " return module.exports;})";

  var callback = eval(package);

  var module = new Module();
  var fn = callback(module.exports, module);

  return fn;
}

module.exports = MyRequre