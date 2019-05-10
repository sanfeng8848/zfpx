let fs = require('fs')

// 通过fs.xxx创建一个可读流
// highWaterMark: 缓冲区大小
let rs = fs.createReadStream('./data/1.txt', {
  flag: 'r',
  mode: 0o666,
  start: 3,
  end: 8,
  highWaterMark: 3
})

rs.on('open', () => {
  console.log('文件打开')
})

rs.setEncoding('utf8')

// 监听她的data事件, 当你一旦开始监听data事件的时候，流就可以读文件的内容并且发射data
rs.on('data', (data) => {
  console.log(data)
  rs.pause()
  setTimeout(() => {
    rs.resume()         //  恢复读取并触发data事件
  }, 2000)
})

rs.on('end', () => {
  console.log('读取完毕')
})

rs.on('close', () => {
  console.log('文件关闭')
})
