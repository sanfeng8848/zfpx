// 分配一个长度为6个字节的Buffer, 会把所有的字节设置为0
// 可以提供默认值
let buf1 = Buffer.alloc(6, 2);
console.log(buf1);

// 分配一块没有初始化的内存, 分配的值不确定, 每次都不相同
let buf2 = Buffer.allocUnsafe(60)      // <Buffer c0 28 25 02 00 00>
console.log(buf2)

// 从一个字符串分配一个buffer, 一个汉字占用3个字节
let buf3 = Buffer.from('中国')
console.log(buf3);

let buf4 = Buffer.alloc(4)
console.log(buf4);
buf4.fill(3, 1, 3)      // 填充的值 填充开始的索引  结束的索引
console.log(buf4);


let buf5 = Buffer.alloc(6)
buf5.write("人生", 0, 3, 'utf8')
console.log(buf5)                 // <Buffer e4 ba ba 00 00 00>
console.log(buf5.toString())      // 人

buf5.write("生", 3, 3, 'utf8')
console.log(buf5)                 // <Buffer e4 ba ba e7 94 9f>
console.log(buf5.toString())      // 人生


let buf9 = Buffer.from('珠峰培训')
let buf10 = buf9.slice(0,5)
let buf11 = buf9.slice(5, 7)
let buf12 = buf9.slice(7)
console.log(buf10)
console.log(buf10.toString(), buf10.length)   // 珠�
console.log(buf11.toString(), buf11.length)   // �培训

/**
 * 1. 客户端向服务器传输数据
 * 2. 聊天内容
 * 不能等所有数据都传输完毕再显示, 所以传输到什么位置之后显示正确的
 */

// 内置模块
let sd_old = require('string_decoder')
// console.log(sd_old)      { StringDecoder: [Function: StringDecoder] }

let { StringDecoder } = require('string_decoder')
let sd = new StringDecoder()

// write读取buffer的内容, 返回一个字符串,
// write的时候判断是不是一个字符, 如果是就输出不是就缓存在对象的内部, 等下次write的时候
// 会把前面缓存的字符加到第二次write的buffer上再进行判断
console.log(sd.write(buf10))
console.log(sd.write(buf11))
console.log(sd.write(buf12))




















