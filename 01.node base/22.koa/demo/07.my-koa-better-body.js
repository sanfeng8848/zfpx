/**
 * 模拟koa-better-body处理请求体
 * 1. 普通的表单 urlencoded
 * 2. 文件上传
 * 
 * 步骤：
 * 1. 查看分析请求体的格式
 * 2. 分隔符, Content-Type的类型, \r\n\r\n
 * 3. 普通字段直接使用 querystring转化为对象 挂载到 ctx.request.fields
 * 4. 文件域 流操作, 写文件
 */
let Koa = require('koa')
let path = require('path')
let qs = require('qs')
let fs = require('fs')
let querystring = require('querystring')
let uuid = require('uuid')
let split = require('./buffer.split')
let app = new Koa()

app.listen(8080)
app.use(async (ctx, next) => {
  if (ctx.url == '/login' && ctx.method == 'GET') {
    ctx.body = `
      <form method='POST' action='/user' enctype='multipart/form-data'>
        <input type="text" name='username'/> <br/>
        <input type="file" name="product"/> <br/>
        <input type="submit" value="提交"/>
      </form>
    `
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  if (ctx.url == '/user' && ctx.method == 'POST') {
    // multipart/form-data; boundary=----WebKitFormBoundarymZ6O0SX4vBg42Bk5
    let contentType = ctx.req.headers['content-type']
    if (contentType.includes('multipart')) {
      // 匹配并且提取分组(.+)
      let matches = contentType.match(/\bboundary=(.+)/)
      // 请求体中实际的分隔符
      let sep = '--' + matches[1]
      // 
      ctx.body = await getBody(ctx.req, sep)
    } else {
      await next()
    }
  } else {
    await next()
  }
})

// 
function getBody(req, sep) {
  return new Promise((resolve, reject) => {
    let buffers = []
    req.on('data', data => {
      buffers.push(data)
    })
    req.on('end', () => {
      // 存放结果数据对象
      let fields = {};
      // 拼接所有的请求体,请求数据data
      let reqBodyBuffer = Buffer.concat(buffers)
      // 根据分隔符将buffer拆分成数组
      let resultArray = split(reqBodyBuffer, sep)
      // 分隔的结果数组前面有个\r\n,最后有一个\r\n, 所以要slice(1, -1)去掉头尾
      resultArray = resultArray.slice(1, -1)
      resultArray.forEach(field => {
        let [desc, value] = split(field, '\r\n\r\n')
        desc = desc.toString()
        value = value.slice(0, -2)    //去掉尾部的/r/n
        if (desc.includes('filename')) {
          let [, line1, line2] = desc.split('\r\n');
          // Content-Disposition: form-data; name="avatar"; filename="msg.txt"
          let obj1 = querystring.parse(line1, '; ')
          // Content-Type: text/plain
          let obj2 = querystring.parse(line2, '; ')
          // 上传文件路径
          let filepath = path.join(__dirname, 'uploads', uuid.v4())
          fs.writeFileSync(filepath, value)
          fields[obj1.name] = [
            { ...obj1, ...obj2, filepath }
          ]
        } else {
          let name = qs.parse(desc.split('; ')[1]).name;
          fields[name] = value.toString();
        }
      })
      resolve(fields)
    })
  })
}