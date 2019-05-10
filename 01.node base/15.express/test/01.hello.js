// lib/express 导出的是一个构造函数, 
const express = require('../lib/express')   
// 函数调用之后, 执行的是new Application, 即实例化一个对象,对象上有方法get listen等属性或方法
const app = express()  

app.get('/', (req, res) => {
  res.end('hello')
})

app.listen(8080, () => {
  console.log('server started...')
})