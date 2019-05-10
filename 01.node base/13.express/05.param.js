// 提取公共的路径参数的处理请求, 不用每次都请求一次数据
const express = require('./express')
const app = express()

// param是用来处理路径参数的
app.param('userid', (req, res, next, userid) => {
  req.user = getUser(userid)
  next()
})

// 模拟 根据用户id获取用户信息
function getUser(userid) {
  return {
    userid: 1, age: 8, name: 'sanfeng'
  }
}

function setUser (user) {
  return user;
}
// 修改用户的name
app.get('/user/:userid/:name', (req, res) => {
  console.log(req.user);
  console.log('===========')
  // 将路径参数挂载到req上
  req.user.name = req.params.name;
  setUser(req.user)
  console.log(req.user)
  res.end('update name successfully.')
})

app.get('/product/:userid/:address', (req, res) => {

})

app.listen(8080, () => {
  console.log('started...');
})