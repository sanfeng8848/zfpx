// 基于测试驱动的开发
/**
 * 1. 创建应用 返回一个函数(express用于调用)
 * 2. 定义路由
 * 3. 起服务监听
 * 4. 根据路径名和方法名进行匹配, 匹配成功执行回调函数
 */
const express = require('../lib/express')
const app = express()

app.get('/', function (req, res) {
  res.end('ok zhichengliu')
})

app.listen(8080, function () {
  console.log('started...');
})