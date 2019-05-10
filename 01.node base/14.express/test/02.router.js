const express = require('express')
const app = express()

// 路径分组, 相同路径的接口, 只匹配一次就可以了
app.get('/user',
  function (req, res, next) {
    console.log('/user step 1')
    next('wrong')
  }, function (req, res, next) {
    console.log('/user step 2');
    next()
  })

app.get('/product', (req, res, next) => {
  console.log('product')
})

app.get('/region', (req, res, next) => {
  console.log('region')
})
app.get('/user', (req, res, next) => {
  console.log(3);
  res.end('ok!!!');
})
// 如果不自己重写错误处理函数, next()函数中的参数将直接传递, 控制台直接输出wrong
app.use('/user', (err, req, res, next) => {
  console.log('err function...')
  res.end()
})
app.listen(8080)
