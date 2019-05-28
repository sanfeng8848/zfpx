/**
 * SyncBailHook熔断任务,只要有一个任务返回的不是undefined,就会停止任务执行
 */
let { SyncBailHook } = require('tapable')

class Lesson {
  constructor () {
    this.hooks = {
      arch: new SyncBailHook(['name'])
    }
  }
  tap () {
    this.hooks.arch.tap('node', name => {
      console.log('node', name);
      return undefined  // 继续后续的执行
      // return null  // 停止后续的任务执行
    });
    this.hooks.arch.tap('react', name => {
      console.log('react', name);
    })
  }
  start () {
    this.hooks.arch.call('jerry')
  }
}
let l = new Lesson()
l.tap()
l.start()
