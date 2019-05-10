
// 此变量属于私有变量(依靠函数作用域, 闭包)
let name = 'hello'

let age = 0

// console.log(age)
/**
 * 1. 此文件(模块)是如何执行的
 */

console.log("3.school --> module", module)

module.exports = {
  name, age
}