let Koa = require('koa')
let bodyParser = require('koa-bodyparser')
let app = new Koa()

app.use(bodyParser())

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
    ctx.body = ctx.request.body;
  } else {
    await next()
  }
})

