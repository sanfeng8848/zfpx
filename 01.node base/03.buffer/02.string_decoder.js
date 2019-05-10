const { StringDecoder } = require('string_decoder')

const decoder = new StringDecoder('utf8');

const cent = Buffer.from("中国");
let buf1 = cent.slice(0, 2)
let buf2 = cent.slice(2)
console.log(cent)
console.log(buf1)
console.log(buf2)
console.log("buf1 decode --> ", decoder.write(buf1));   // 不满足3个字节, 不输出
console.log(decoder.write(buf2));       // 把上次write没有凑整的buffer缓存起来, 拼接到本次一起输出


const euro = Buffer.from([0xE2, 0x82, 0xAC]);
console.log(decoder.write(euro));

console.log("============")
decoder.write(Buffer.from([0xE2]));
decoder.write(Buffer.from([0x82]));
console.log(decoder.end(Buffer.from([0xAC])));