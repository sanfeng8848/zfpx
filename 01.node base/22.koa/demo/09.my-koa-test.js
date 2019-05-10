let Koa = require('./08.my-koa')
// let Koa = require('koa')
let app = new Koa()

app.use(async (ctx, next) => {
  console.log(1);
  await next()
  console.log('final');
})


app.use(async (ctx, next) => {
  console.log(2);
  await next()
  console.log(4);
})

app.use(async (ctx, next) => {
  console.log(3);
  ctx.res.end('OK')
})

app.listen(8080)