// 可写流
// 如何简单方便的得到一个可写流呢?
let { Writable } = require('stream')
let arr = []

let ws = Writable({
  write (chunk, encoding, callback) {
    arr.push(chunk)
    callback()
  }
}) 

for (let i = 0; i < 5; i++) {
  // 可写流 Writable的实例调用write方法
  ws.write(i + '')    
}
ws.end()

setTimeout(function () {
  console.log(arr.toString())
}, 500)
