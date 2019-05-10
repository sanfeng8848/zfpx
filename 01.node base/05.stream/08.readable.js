// 创建可读流,

const fs = require('fs')


//立刻从文件中读取highWaterMark的数据(此例是3字节), 读完之后填充缓冲区, 然后触发发射readable
let rs = fs.createReadStream('./data/5.txt', {
  highWaterMark: 3
})

// 监听readable事件
rs.on('readable', () => {
  let ch = rs.read(1)
  console.log(ch)
  setTimeout(() => {
    console.log(rs._readableState.length)
  }, 200)
})