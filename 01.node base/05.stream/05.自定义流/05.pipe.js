let { Writable, Readable } = require('stream')

let i = 0;

let rs = Readable({
  highWaterMark: 2,
  read () {
    if (i < 5) {
      this.push('' + i++)
    } else {
      this.push(null)
    }
  }
})

let ws = Writable({
  highWaterMark: 2,
  write (chunk, encoding, callback) {
    console.log(chunk.toString())
    // 可写流必须调用callback才能消费流的数据, 才能写数据
    // 如果不调用callback, 就只读了一个字节, 然后将这一个字节传递给了可写流, 可写流的缓冲区只有一个字节,
    // 还没有得到hwm, 所以, 可读流继续读取一个字节, 传递给可写流ws, 当ws的缓冲区到达了hwm, 
    // 一直没有消费数据(没有调用callback), 可写流暂停, 可读流也暂停了, 
    // 所以 打印 rs._readableState.length 和 ws._writableState.length 都是设置的hwm
    // 
    // 如果没有调用callback, 输出rs,ws的缓冲区大小就是第一次填满的hwm
    // 如果调用了callback, 等pipe执行结束之后, setTimeout之后 下一次事件循环
    // callback()
  }
})

// 1. 如果使用on('data')方法没问题
// rs.on('data', function (data) {
//   console.log(data);
// })

// 2. 
rs.pipe(ws)
console.log('hello')
// 500ms之后查看缓冲区大小
setTimeout(function () {
  console.log(rs._readableState);
  console.log(ws._writableState);
  // console.log(rs._readableState.length);
  // console.log(ws._writableState.length);
}, 0)



