/**
 * SyncWaterfallHook: 前一个任务执行的返回值 作为下一个任务的输入数据 Array.prototype.reduce
 */
let { SyncWaterfallHook } = require('tapable')

class Lesson {
  constructor () {
    this.hooks = {
      arch: new SyncWaterfallHook(['name'])
    }
  }
  tap () {
    this.hooks.arch.tap('node', name => {
      console.log('node', name)
      return 'return value'
    })
    this.hooks.arch.tap('vue', data => {
      console.log('vue', data)
    })
  }
  start () {
    this.hooks.arch.call('jerry')
  }
}

let l = new Lesson()
l.tap()
l.start()