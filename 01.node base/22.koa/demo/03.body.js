/**
 * 1. 中间件顺序执行, 不等待req.on('data')和end事件
 * 2. 当前的中间件响应就结束了!!!
 * 3. 响应都结束了, 再设置ctx.body = 'xxx' 就会出现NOT FOUND
 * 4. 接受请求体的数据是异步的
 * 
 * 处理方法
 * 1. 要等待完全接受到数据之后,程序再向下执行
 * 2. promise
 */
let Koa = require('koa')
let qs = require('qs')

let app = new Koa()

app.use(async function (ctx, next) {
  if (ctx.url == '/login' && ctx.method == 'GET') {
    ctx.set('Content-Type', 'text/html;charset=utf8')
    ctx.body = (
      `
        <form method='POST' action='/user'>
          <input type="text" name="username"/> <br/>
          <input type="submit"/>
        </form>
      `
    )
  } else {
    await next()
  }
})

app.use(async function (ctx, next) {
  console.log(ctx.url, ctx.method);
  if (ctx.url == '/user' && ctx.method =='POST') {
    let buffers = []
    ctx.req.on('data', data => {
      buffers.push(data)
    })
    ctx.req.on('end', function () {
      let result = Buffer.concat(buffers)
      ctx.body = qs.parse(result.toString())
    })
  } else {
    await next()
  }
})

app.listen(8080)