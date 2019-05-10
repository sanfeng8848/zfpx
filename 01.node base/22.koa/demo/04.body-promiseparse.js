let Koa = require('koa')
let querystring = require('querystring')
let app = new Koa()
app.listen(8080)
app.use(async (ctx, next) => {
  if (ctx.url == '/login' && ctx.method == 'GET') {
    ctx.body = `
      <form method='POST' action='/user'>
        <input type="text" name='username'/> <br/>
        <input type="submit" value="提交"/>
      </form>
    `
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  if (ctx.url == '/user' && ctx.method == 'POST') {
    ctx.body = await parse(ctx.req)     // 监听data end事件, 拿到请求体,(通过querystring转换为对象)
  } else {
    await next()
  }
})

// 返回promise
function parse (req) {
  return new Promise((resolve, reject) => {
    let buffers = []
    req.on('data', data => {
      buffers.push(data)
    })
    req.on('end', () => {
      let result = Buffer.concat(buffers).toString()
      resolve(querystring.parse(result))
    })
  })
}