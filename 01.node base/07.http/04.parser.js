// 解析报文,请求对象, 也就是请求信息, 解析出请求头, 把这个请求头传递给监听函数
const fs = require('fs')
const path = require('path')

function parser (requestStream, requestListener) {
  // 1. 为什么监听readable事件, 而不是data事件? 因为readable事件可以处理逻辑复杂的可读流, 可暂停
  requestStream.on('readable', function () {
    // read() 不传递参数n, 就是不指定读取的字节数, 就是读取尽可能多的字节数, 可读流 64k
    // 把缓冲区充满, 就是当触发readable事件时, 缓冲区就是尽可能多的数据, 即64k

    // let data = requestStream.read()
    // console.log(data);
    
    // 以上写法并不好, 因为如果读取的数据很大, 可能会读取多次, 所以使用while, 将所有的数据收集完毕之后再解析
    let buf;
    // 1. 先读取缓冲区中的数据, 将数据赋值给buf
    // 2. 只要buf != null, 就说明从缓冲区中还可以读到数据
    while ((buf = requestStream.read()) != null) {
      
    }
  })
}

let rs = fs.createReadStream(path.join(__dirname, './req.txt'))

// 把可读流传递给fn, 并且将解析后的req传递给监听函数
parser(rs, function (req) {
  console.log(req.method);
  console.log(req.url)
  console.log(req.headers);
  req.on('data', function (data) {
    console.log(data)
  })
  req.on('end', function () {
    console.log('请求处理结束, 开始响应 res.end()');
  })
})