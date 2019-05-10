const http = require('http')

let options = {
  host: 'localhost',
  port: 8080,
  method: 'POST',
  path: '/user',
  // 包含请求头的对象
  headers: {
    // 'Content-Type': 'application/json'       // 测试json
    // 'Content-Type': 'application/x-www-form-urlencoded'   // 测试 urlencoded函数
    'Content-Type': 'text/plain'
  }
}
// 把请求的请求体, 原封不动的返回给标准输出 stdout
let req = http.request(options, function (res) {
  res.pipe(process.stdout)
})
// 客户端发起POST请求,请求头格式是urlencoded格式, 数据拼接在url中


/*
// 1. 使用req.write()
req.write('name=sanfeng')   // write一次就会触发 服务端的on('data',fn) 事件
req.write('&age=100')       
req.end()                   // end()关闭的时候会触发可读流请求对象的end事件 req.on('end',fn2)
*/
// 1. 查询字符串的形式
// req.end("name=sanfeng&age=20")

// 2. 测试qs和querystring的区别, 需要传递查询字符串 而不是json对象
// req.end("{name:'sanfeng', home: { name: 'fengtai', address: 'beijing'}}")


// req.end("name=zfpx&age=30")   // 测试urlencoded
// req.end('{"name": "sanfeng"}')
req.end('你好世界')