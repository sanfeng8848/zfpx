require('./1.module')
console.log(1)
console.log(module.loaded)    // false
// console.log("module.loaded.js 中的module ", module)    // false
setTimeout(function () {
  console.log(module.loaded)    // true 加载完成之后输出
})
console.log(2)

Object.keys(module).forEach(function (item) {
  console.log(item, " --> ", module[item])
})