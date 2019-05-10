const Koa = require('../src/tiny-koa')
let app = new Koa()

// 路由中间件
let Router = require('../middleware/my-koa-router')
let router = new Router()
app.use(router.routes())

router.all('/api/user/post', async (ctx, next) => {
  ctx.body = 'post1'
  return next()
})

router.all('/api/user/post', async (ctx, next) => {
  ctx.body = 'post2'
  return next()
})

app.use(async function (ctx, next) {
  console.log('Koa中间件1')
  ctx.body = 'Koa中间件1'
  await next()
})

app.use(async function (ctx, next) {
  console.log('Koa中间件2')
  ctx.body = 'Koa中间件2'
  await next()
})

app.listen(8080, function () {
  console.log('server start...')
})