const fs = require('fs')

let rs = fs.createReadStream('./data/1.txt', {
  flags: 'r',
  mode: 0o666,
  highWaterMark: 3
})

let ws = fs.createWriteStream('./data/4.txt', {
  flags: 'w',
  mode: 0o666,
  highWaterMark: 3
})

// 从文件中读入缓冲区 非暂定模式
rs.on('data', (err, data) => {
  console.log(data)
  // 将数据写入可写流, 当缓冲区已满时, 写入文件
  let flag = ws.write(data);
  // 如果为false, 说明写入缓冲区已满, 应当停止写入缓冲区, 避免消耗过多内存
  // 可写流返回false，我们应当停止读取，以避免消耗过多内存
  if (!flag) {
    rs.pause()
  }
})

// 当写入的缓冲区已经写入文件完成, 并且缓冲区被清空后, 可以再次向写入流写入数据时, 触发drain事件
// 可读流可以继续从文件中读取数据
rs.on('drain', function () {
  console.log('drain')
  rs.resume()
})