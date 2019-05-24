let  { SyncHook } = require('tapable')

class Lesson {
  constructor () {
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }
  // 注册监听函数
  tap () {
    this.hooks.arch.tap('nodejs', function (name) {
      console.log('nodejs ', name);
    })
    this.hooks.arch.tap('react', function (name) {
      console.log('react ', name);
    })
  }
  // 启动钩子的方法
  start () {
    this.hooks.arch.call('sanfeng')
  }

}

let l = new Lesson()
l.tap();    // 注册两个事件
l.start()  // 启动钩子