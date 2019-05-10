/**
 * 以前的JS 只需要处理字符 如何实现进制的转换
 * 
 */

let a = 0b10010;        // 二进制 0b开头
console.log(a)

let b = 0o24;           // 八进制
console.log(b);

let c = 20              // 十进制
let d = 0x14;           // 十六进制

// 任意进制转换为10进制
console.log(parseInt(10100, 2))   // parseInt(数值, 对应的进制)

// 10进制转成任意进制
console.log(c.toString(2));

// 八进制 转换为 十六进制


