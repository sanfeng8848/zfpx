let fs = require('fs')
let iconv = require('iconv-lite')
// gbk.txt 文件编码是gbk, 每个中文存储2个字节
// 如果toString() 就是默认转化为utf8编码, 输出就是乱码 utf8 是3个字节表示一个中文
// 使用iconv-lite: 这个包: gbk转化为utf8编码的字符串



fs.readFile('./data/gbk.txt', (err, data) => {
  // console.log(data.toString('gbk'))  nodejs不支持中国人的编码, 所以不支持gbk
  // 实现转码操作, 把一个GBK比那么的buffer转变成UTF8编码
  let str = iconv.decode(data, 'gbk')
  console.log(str)
})