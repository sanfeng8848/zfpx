/**
 * 执行所有任务, 没有熔断(SyncBailHook), 也不是数据传递(SyncWaterfallHook), 
 * 而是必须执行所有任务, 对于task可以指定执行多次 
 * 如果返回undefined, 执行下一个, 否则继续执行当前任务
 */
class SyncLoopHook {
  constructor (args) {
    this.tasks = []
  }
  tap (name, task) {
    this.tasks.push(task)
  }
  call (...args) {
    this.tasks.forEach(task => {
      let ret = null;
      do {
        ret = task(...args)
      } while (ret != undefined)
    })
  }
}
let total = 0;
let l = new SyncLoopHook(['name'])
l.tap('node', name => {
  console.log('node ', name);
  return ++total == 3 ? undefined : 'loop task'
})
l.tap('vue', name => {
  console.log('vue ', name);
  return ++total == 5 ? undefined : 'loop vue task'
})
l.call('sanfeng...')

