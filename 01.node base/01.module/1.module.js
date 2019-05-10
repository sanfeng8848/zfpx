/**
 * 1. 闭包 自执行函数       !
 * 2. require.js AMD
 * 3. sea.js  CMD
 * 4. node.js common.js    !
 * 5. es6 es module        !
 * 6. umd  amd+ cmd+ common + es + module
 */


//exports是module.exports对象的别名，提供便捷的属性和方法设置
console.log(module.exports === exports)

let add = function (x, y) {
  return x + y;
}
let mul = function (x, y) {
  return x * y;
}


// module.exports = {
//   chu: function (x, y) {
//     return x / y;
//   },
//   add,
//   mul
// }


exports.hello = function (name) {
  console.log(name)
}
