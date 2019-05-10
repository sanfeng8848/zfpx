// webpack插件就是个transform流
// 应用场景:
/**
 * 1. 字符串加密: 给定一个字符串, 输出加密后的串. 有输入 有输出
 * 2. gulp webpack都是
 */
let { Transform } = require('stream')

let t = Transform({
  transform(chunk, encoding, cb) {
    // 类似read方法中的push, 中间处理chunk数据, 存入到可读流的缓冲区
    this.push(chunk.toString().toUpperCase())
    cb()
  }
})

// 从可读流中(标准输入流)中获取(读取)数据, 把数据交给(灌输)到转换流
// 转换之后的流再交给标准输出
process.stdin.pipe(t).pipe(process.stdout)