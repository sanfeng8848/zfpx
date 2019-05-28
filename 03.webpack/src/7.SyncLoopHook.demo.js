/**
 * 多个任务,希望某个任务多次执行, 只要该任务不返回undefined,就继续执行当前任务
 * 直到返回undefined时, 执行下一个任务
 */

let { SyncLoopHook } = require('tapable')
class Lesson {
  constructor (args) {
    this.index = 0
    this.hooks = {
      arch: new SyncLoopHook(['name'])
    }
  }
  tap () {
    this.hooks.arch.tap('node', name => {
      console.log('node ', name)
      return ++this.index === 3 ? undefined : 'go to next task'
    })
    this.hooks.arch.tap('vue', name => {
      console.log('vuejs', name)
    })
  }
  start (...args) {
    this.hooks.arch.call(...args)
  }
}

let l = new Lesson()
l.tap()
l.start('Leo')