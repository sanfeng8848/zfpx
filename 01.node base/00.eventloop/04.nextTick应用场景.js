/**
 * 1. 构造函数内执行的函数要等所有同步代码执行完毕立即执行的时候
 */

/*
function Clock () {
  this.listener;    // 没有赋值
  this.listener();  // 如果实例化后, 就会报错, undefined不是函数
}
// 添加原型方法, 给构造函数的实例对象添加方法
Clock.prototype.add = function (cb) {
  this.listener = cb
}

let c = new Clock();    // 实例化后就已经执行了 this.listener();   TypeError: this.listener is not a function
// add的参数是个回调函数, 赋值给实例属性listener, 供内部调用 this.listener()
c.add(function () {
  console.log(1);
})
*/

// 使用nextTick 实现同步代码执行完毕之后, 再执行构造函数中的listener的调用
function NewClock () {
  this.listener;
  // 将匿名函数
  // process.nextTick(function () {
  //   console.log(this)   // 此时的this是global, 因为调用者是process
  //   // this.listener()
  // })
  // process.nextTick(() => {
  //   this.listener()
  // })
  let that = this;
  process.nextTick(function () {
    that.listener()
  })
}

NewClock.prototype.add = function (cb) {
  this.listener = cb;
}

let c1 = new NewClock()
c1.add(function () {
  console.log('new clock')
})
