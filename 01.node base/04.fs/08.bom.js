let fs = require('fs')

// hello.txt 是一个utf8编码, 并且有bom, bom是前三个字节是 ef bb bf
// fs.readFile('./data/hello.txt', (err, data) => {
//   if (err) {
//     console.log(err)
//   }
//   console.log(data.length)
//   if (data[0] === 0xef && data[1] === 0xbb && data[2] == 0xbf) {
//     data = data.slice(3);
//   }
//   console.log(data.toString())
// })

// 函数的封装
function readText (pathname) {
  let bin = fs.readFileSync(pathname)
  console.log("去处bom之前的文件字节数: ", bin.length)
  if ((bin[0] === 0xEF && bin[1] == 0xBB && bin[2] == 0xBF)) {
    bin = bin.slice(3)
  }
  console.log("去处bom之后的文件字节数: ", bin.length)
  return bin.toString('utf-8')
}

let str = readText('./data/hello.txt')
console.log(str)

// GBK编码的文件, 如果读取后的buffer进行toString()默认是UTF-8，就会发生乱码
