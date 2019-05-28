/**
 * 同步串行执行,如果有一个task返回值不是undefined, 就会终止后续所有的任务
 */
class SyncBailHook {
  constructor () {
    this.tasks = []
  }
  tap (name, task) {
    this.tasks.push(task)
  }
  call (...args) {
    let index = 0,
        ret = null;
    do {
      ret = this.tasks[index++](...args)
    } while (ret === undefined && index < this.tasks.length)
  }
}

let b = new SyncBailHook()
b.tap('nodejs', (name) => {
  console.log('nodejs', name)
  return 'hello'
})
b.tap('react', (name) => {
  console.log('react', name)
})
b.call(['hello world', 'sanfeng'])