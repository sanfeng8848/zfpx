let express = require('express')
let app = express()
// 中间件没有请求方法, 只有请求路径, 当路径匹配的时候, 就执行相应的处理函数, 并且接受一个next参数,next也是函数
// 中间件的使用
// 1. 没有路径的中间件, 所有路径请求都会走处理函数
app.use(function (req, res, next) {
  console.log('没有路径的中间件');
  next()    // 调用next() 执行下一个中间件或者路由
})

// 2. 带路径的中间件, 也可以直接返回响应 res.end()
app.use('/water', function (req, res, next) {
  console.log('带路径的中间件, 过滤水');
  next()
  // res.end('res.end')
})

app.get('/water', function (req, res) {
  res.end('water')
})


app.listen(8080, () => {
  console.log('server started at port 8080...');
})