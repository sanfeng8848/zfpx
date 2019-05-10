const TinyKoa = require('./src/tiny-koa')
// const static = require('./middleware/tiny-koa-static')
const static = require('./middleware/my-static')

const app = new TinyKoa()
const path = require('path')
const port = 8080

app.use(static(path.join(__dirname, 'static')))

// 路由


app.use(async (ctx, next) => {
  console.log('hello tinyKoa1');
  ctx.body = 'hello tinyKoa1'
  await next()
  // debugger
  console.log('back hello tinyKoa1');
})
app.use(async (ctx, next) => {
  console.log('hello tinyKoa2');
  ctx.body = 'hello tinyKoa2'
  await next()
  // debugger
  console.log('back hello tinyKoa2');
})
app.use(async (ctx, next) => {
  console.log('hello tinyKoa3');
  ctx.body = 'hello tinyKoa3'
  await next()
  // debugger
  console.log('back hello tinyKoa3');
})

app.listen(port, () => {
  console.log(`server start at port ${port}`);
})