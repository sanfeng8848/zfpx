// let path = '/user/:uid/:name'
// let reg = /\/user\/([^\/]+)\/([^\/]+)/
// let url = '/user/1/sanfeng'
// let result = reg.exec(url)
// console.log(result);


let path = '/user/:uid/:name'

// let pathToRegexp = require('path-to-regexp')
let keys = []
let result = pathToRegexp(path, keys)
console.log(result)   // /^\/user\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i
console.log(keys)

// path-to-regexp 第三方模块有两个功能
// 1. 编译path参数路径 成正则返回return, 也就是正则替换 案例里的result就是正则
// 2. 将路径参数的名字, 放到keys数组中 函数的第二个参数

/**
 * 
 * @param {带有路径参数的路径 /user/:id/:name} path 
 * @param {路径参数的名称push到这个数组中} keys 
 */
function pathToRegexp(path, keys) {
  return path.replace(/:([^\/]+)/g, function () {
    console.log(arguments)
    keys.push(arguments[1])
    return '(?:([^\/]+?))'
  })
}
// let result = pathToRegexp(path, keys)
// console.log(result)
// console.log(keys);