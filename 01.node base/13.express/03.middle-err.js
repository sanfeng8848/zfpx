let express = require('./express')
let app = express()

// 路由


app.get('/hello', (req, res) => {
  console.log('get hello');
})
app.post('/hello', (req, res) => {
  console.log('post hello')
})

// 中间件

app.use('/hello', (req, res, next) => {
  console.log('带有路径的中间件')
  next()
})

app.use('/water', (req, res, next) => {
  next('water 出错了')
})

app.use('/water', (err, req, res, next) => {
  res.end('water 异常捕获中间件', err);
})


app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'text/html;charset=utf8')
  console.log('没有路径的中间件1111');
  next('出错了')
})

// 错误处理中间件, express提供
app.use(function (err, req, res, next) {
  console.log('错误处理中间件....')
  console.log('err ---->', err)
  res.end('err msg: ', err)
})

app.listen(8080, () => {
  console.log('8080 started....');
})