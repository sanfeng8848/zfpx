/**
 * koa-better-body的使用
 * ctx.request.fields 属性包含着所有的请求体的数据
 */
let Koa = require('koa')
let bodyParser = require('koa-better-body')
let path = require('path')
let app = new Koa()

app.use(bodyParser({
  uploadDir: path.join(__dirname, 'uploads')
}))

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
    console.log(ctx.request.fields);
    ctx.body = ctx.request.fields;
    // ctx.body = ctx.request.body;
  } else {
    await next()
  }
})

