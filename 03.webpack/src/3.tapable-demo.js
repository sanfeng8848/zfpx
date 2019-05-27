let { SyncHook } = require('tapable')

class Lesson {
  constructor () {
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }
  tap () {
    this.hooks.arch.tap('node', function (name) {
      console.log('node', name)
    })
    this.hooks.arch.tap('vue', (name) => {
      console.log('vue', name)
    })
  }
  start () {
    this.hooks.arch.call('sanfeng')
  }
}

let l = new Lesson()
l.tap()
l.start()