// 钩子是同步的
class SyncHook {
  // args就是数组 args ==> ['name']
  constructor (args) {
    this.tasks = []
  }
  // 同步注册
  tap (name, task) {
    this.tasks.push(task)
  }
  call (...args) {
    this.tasks.forEach(task => {
      task(...args)
    })
  }
}

let hook = new SyncHook(['name'])
hook.tap('react', function (name, age) {
  console.log('react', name, age);
})
hook.tap('node', function (name, age) {
  console.log('node', name, age);
})

hook.call('sanfeng8848', 19)