// 可读可写流
const { Duplex } = require('stream')

let i = 0
// 重写read write方法
let duplex = Duplex({
  read () {
    if (i++ < 3) {
      this.push('a')
    } else {
      this.push(null)
    }
  },
  
  // write方法的参数 callback, 是系统提供的, 目的是写入下一个buffer
  write (chunk, encoding, callback) {   
    console.log(chunk.toString().toUpperCase())
    callback()
  }
})
// process.stdin  标准输入流  监控键盘输入
// process.stdout 标准输出流  控制台输出
process.stdin.pipe(duplex).pipe(process.stdout)