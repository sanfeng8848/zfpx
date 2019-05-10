/**
 * 1. 强调中间件 app.use
 * 2. 中间件函数是异步函数 async
 * 3. 洋葱模型
 * 4. await next()
 */
let Koa = require('koa')
let app = new Koa()

app.use(async function (ctx, next) {
  console.log(1);
  await next()
  console.log(3);
})

app.use(async function (ctx, next) {
  console.log(2);
  ctx.body = 'hello'
})

app.listen(8080, () => {
  console.log('start...');
})