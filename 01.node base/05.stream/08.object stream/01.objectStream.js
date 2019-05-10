// 普通流放的是buffer, 对象流放的是对象

let { Transform } = require('stream')
let fs = require('fs')
// 创建可读流
let rs = fs.createReadStream('./user.json')

// transform流是可读可写流, 从文件读取数据之后放入交给可读流
let toJSON = Transform({
  readableObjectMode: true,     // 就可以向可读流里放对象了
  transform (chunk, encoding, cb) {
    // console.log(chunk.toString());

    // 向可读流的数据源里面放(1. 可能放在可读流的缓冲区里 2. 可能直接消费输出了 )
    this.push(JSON.parse(chunk.toString()))  
  }
})

// 充当可写流
let outJSONObj = Transform({
  writableObjectMode: true,
  transform (chunk, encoding, cb) {
    // 消费可读流中的数据, 比如控制台答应
    console.log(chunk);
    cb()
  }
})



// 可读流pipe到可写流 toJSON充当的可写流的角色
// rs.pipe(toJSON)

rs.pipe(toJSON).pipe(outJSONObj)



