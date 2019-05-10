let fs = require('fs')
const path = require('path')
/**
 * 同步的广度优先先序遍历
 * 
 */
function wide (dir) {
  let arr = [dir]
  while (arr.length > 0) {
    let current = arr.shift();      // 取出数组第一个元素
    console.log(current);
    let stat = fs.statSync(current)
    if (stat.isDirectory()) {
      let files = fs.readdirSync(current)
      files.forEach(item => {
        arr.push(path.join(current, item))
      })
    }
  }
}

wide('a')

function wide (dir) {
  let arr = [dir]
  while (arr.length > 0) {
    let current = arr.shift()
    console.log(current)
    let stat = fs.statSync(current)
    if (stat.isDirectory()) {
      let files = fs.readdirSync(current)
      files.forEach(item => {
        arr.push(path.join(current, item))
      })
    }
  }
}