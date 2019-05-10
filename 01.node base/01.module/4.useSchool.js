// let school = require('./3.school')
// console.log(module)
/**
 * 在nodejs里通过require方法加载其他模块
 * 加载是同步的
 * 1. 找到这个文件
 * 2. 读取此文件模块的内容
 * 3. 把它封装在一个函数里立即执行
 * 4. 执行后把模块的module.exports对象赋值给school
 * 
 */

/**
 * 1. 因为模块实现了缓存, 当第一次加载一个模块之后, 会缓存这个模块的exports对象。以后如果再次加载这个模块的话
 * 则直接从缓存中取，不需要再次加载了
 *
 * 2. 缓存的key是什么?
 */

// require两次同一个模块, 只加载一次模块, 第二个从缓存中取
// 缓存在哪里 require.cache
console.log(Object.keys(require.cache));

let s = require('./3.school')
console.log(Object.keys(require.cache));

let s1 = require('./3.school')
console.log(Object.keys(require.cache));


// 3. 查看一下require方法的一些属性
console.log("查看一下require方法的一些属性");
console.log(require);

/**
 * resolve: 方法: 当想知道一个模块的绝对路径的时候，但又不想真正加载这个模块
 */


console.log("module.loaded --> ", module.loaded)

//函数声明
function a () {
  console.log(module)
}

// !可以将匿名函数转化为表达式, 然后后面跟上一个(), 表示表达式的调用执行
!function () {
  // console.log(module)
}()