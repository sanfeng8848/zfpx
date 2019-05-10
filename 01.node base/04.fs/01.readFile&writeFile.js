const fs = require('fs')

// 读文件
fs.readFile('./01.readFile&writeFile.js',
            {
              encoding: 'utf8',
              flag: 'r'
            } ,(err, data) => {
  if (err) {
    console.log(err)
  } else {
    // console.log(data)
  }
})

// 写文件
// 写入文件制定字符编码的作用: 字符串写入文件, 都是buffer存储, 字符串转成二进制用的
// utf8时, 用3个bytes存储, gb2312使用2个字节存储表示
// 打开文件是字符串, 并不是说文件存储的是字符串, 计算机中存储的文件都是二进制(0&1), 每个文件都有存储编码的, 比如此文件就是UTF-8编码
fs.writeFile('./data/1.txt', '珠', { encoding: 'utf8', flag: 'a', mode: 0o666 }, (err) => {
  if (err) {
    console.log(err)
    return;
  }
  console.log('写入成功')
})

fs.appendFile('./data/1.txt', 'data', 'utf8', err => {
  console.log(err)
})


// 文件读取 把文件当做一个整体操作
// 当文件特别大, 大于内存的是无法执行操作的
// 需要精确的读取的字节
// fd: 文件描述符
// 0: 标准输入 1: 标准输出
fs.open('./data/1.txt', 'r', 0o666, (err, fd) => {
  console.log(fd)
})

