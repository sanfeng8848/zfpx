/**
 * 同步, 任务之间有关联的, 需要传递数据的  就像瀑布流一样传递数据
 */

class SyncWaterfallHook {
  constructor (args) {
    this.tasks = []
  }
  tap (name, task) {
    this.tasks.push(task)
  }
  // 拿到形参args,调用第一个函数把args传递进去执行,
  // 然后拿到第一个函数的返回值,把函数返回值的结果传递给下一个函数作为入参
  call (...args) {
    // 数组解构, 解构出第一个数组元素, 以及其他的数组元素
    let [first, ...other] = this.tasks;
    let ret = first(...args)
    // other.reduce((prev, next) => {
    //   return next(prev)
    // }, ret)
    other.reduce((prev, next) => next(prev), ret)
  }
}

let l = new SyncWaterfallHook(['name'])
l.tap('react', name => {
  console.log('react', name);
  return 'react ok'
});
l.tap('vue', data => {
  console.log('vue', data);
  return 'vue ok'
});
l.tap('webpack', data => {
  console.log('webpack', data);
  return 'webpack ok'
})
l.call('jerry sanfeng')
