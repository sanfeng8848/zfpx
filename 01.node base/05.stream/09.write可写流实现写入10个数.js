const fs = require('fs')

let ws = fs.createWriteStream('./data/6.txt', {
  highWaterMark: 3
})

// 定义一个数, 比如9, 实现的功能就是, 向文件中写入9-0 一共10个数, 以流的方式写入
let n = 9

// 定义一个方法, 然后调用
function write () {
  // 可写流write方法的返回值 boolean, 一般highWaterMark 一般初始是true
  let flag = true
  // 只要n大于0, 并且缓冲区还没有满, 就一直write, 写入缓冲区
  while (flag && n > 0) {
    flag = ws.write(n+"")
    n--;
    console.log(flag)
  }
  // 当缓冲区已经满了, 监听到drain事件, 需要清空款冲区
  ws.once('drain', () => {
    console.log('drain')
    write()
  })

}

write(n)