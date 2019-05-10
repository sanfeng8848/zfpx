// concat 连接buffer
// 源码实现 concat

// 1. 测试代码  合并两个buffer
let buf1 = Buffer.from('人')
let buf2 = Buffer.from('民')

// 原生调用
let bufRes = Buffer.concat([buf1, buf2], 6)
console.log(bufRes)     // <Buffer e4 ba ba e6 b0 91>
console.log(bufRes.toString())     // 人民 toString() 默认字符编码 utf8
console.log(bufRes.toString('hex'))    // e4babae6b091   输出字符编码 hex： 将每个字节编码成两个十六进制字符
console.log(bufRes.toString('ascii'))
console.log(bufRes.toString('base64'))  // 5Lq65rCR


// 自己封装
// 1. Buffer是类 直接添加属性
/**
 * buffer 本身就是字节数组!!!
 * 入参:
 * 1. 要合并的buffer数组或者buffer
 * 2. 合并后的buffer总长度(默认是多个buffer的total.length), 也可以自定义合并"截取"后的大小
 * totalSize: list中所有buffer长度之和
 */
Buffer.myConcat = function (list, totalSize = 0) {
  if (!Array.isArray(list)) {
    return;
  }
  if (list.length === 1) {
    return list[0]
  }
  // 合并后的默认总长度
  totalSize = list.reduce((len, item) => len + item.length, 0)
  // Buffer是固定长度的, 开辟空间
  let result = Buffer.alloc(totalSize)
  let index = 0
  for (let buf of list) {   // buf: list中的每个buf
    for (let b of buf) {    // b: 每个字节
      if (index >= totalSize) {   // 如果越界了, 直接返回
        return result
      } else {
        result[index++] = b
      }
    }
  }
  return result
}


// 1. 要合并的 Buffer 数组或 Uint8Array 数组
// 2. 合并后 Buffer 的总长度



console.log("========测试调用==========")
// 自己实现的封装的调用测试
let res = Buffer.myConcat([buf1, buf2])
// let res = Buffer.myConcat([buf1, buf2], 5)
console.log(res)
console.log(res.toString())


res = Buffer.myConcat({buf1, buf2})
console.log(res)
console.log(res.toString())



// 1. Buffer 类用于在 TCP 流或文件系统操作等场景中处理"字节"流。
// let buf = Buffer.alloc(3)
// buf.fill(Buffer.from('中过'))
// console.log(buf)
//

// var bufascii = Buffer.from('hello world', 'ascii');
// console.log(bufascii.toString('ascii'))
//
// var bufascii = Buffer.from('hello world', 'utf8');
// console.log(bufascii.toString('utf8'))

