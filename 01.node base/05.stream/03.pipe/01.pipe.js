// 引入两个自己写的流, 并实现 可读流到可写流的pipe
const ReadStream = require('../02.MyReadStream/02.ReadStream')
const WriteStream = require('../01.MyWriteStream/MyWriteStream')
const path = require('path')
// 创建两个实例
// 1. 可读流
let rs = new ReadStream(path.join(__dirname, '../data/3.txt'), {
  start: 3,
  end: 8,
  highWaterMark: 3
})

// 2. 可写流
let ws = new WriteStream('./pipe.txt', {
  highWaterMark: 3
})

// pipe的方法是可读流的方法
rs.pipe(ws)