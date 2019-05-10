/**
 * 1. koa的上下文对象ctx
 * 2. ctx上的属性
 */

let Koa = require('koa')
let app = new Koa()

app.use(async (ctx, next) => {
  console.log(ctx.url);
  console.log(ctx.method);
  console.log(ctx.path);
  console.log(ctx.querystring, ' ------ ', ctx.query)
  console.log(ctx.headers);
  ctx.body = ctx.headers;   // ctx.body 响应体
})

app.listen(8080)