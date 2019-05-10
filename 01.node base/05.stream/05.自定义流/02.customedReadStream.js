/**
 * 实现一个自定义流, 比如Counter
 */
let { Readable } = require('stream')  // 解构出 Readable类
let util = require('util')
util.inherits(Counter, Readable);    // 子类继承父类

function Counter () {
  // super.call(this)
  Readable.call(this) // 继承父类的属性
  this.index = 10
}

// 子类要实现(覆盖)父类的(原型)方法 (分析源码Readable.prototype.read = function () {....})
// 源码中实现的是_read方法

Counter.prototype._read = function () {
  if (this.index-- > 0) {
    this.push(this.index + "")  // 内部实现的向缓冲区push数据
  } else {
    this.push(null)
  }
}

let counter = new Counter()
counter.on('data', data => {
  console.log(data.toString())
})
