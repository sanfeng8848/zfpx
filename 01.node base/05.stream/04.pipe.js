let fs = require('fs')
let rs = fs.createReadStream('./data/1.txt', {
  highWaterMark: 3
})
let ws = fs.createWriteStream('./data/3.txt', {
  highWaterMark: 3
})

// rs.on('data', function (data) {
//   console.log(data)
//   let flag = ws.write(data)
//   if (!flag) {
//     rs.pause()
//   }
// })

// 可写流可以接收更多数据的信号

// ws.on('drain', function () {
//   console.log('drain')
//   rs.resume()
// })

// 管道输出到可写流中, pipe是可读流的方法, 通过debug调试查看源码
rs.pipe(ws)

// 移除目标可写流, pipe之后就unpipe就会无法写入, 刚接上就移除了
// rs.unpipe(ws)


