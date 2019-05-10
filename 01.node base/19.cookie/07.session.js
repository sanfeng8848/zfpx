const express = require('express')
const app = express()
const uuid = require('uuid')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

let SESSION_KEY = 'connect:sid';
let sessions = {}
app.get('/', function (req, res) {
  // 请求时获取客户端发来的sessionId, 由cookie保存
  let sessionId = req.cookies[SESSION_KEY];
  if (sessionId) {
    let obj = sessions[sessionId]
    if (obj) {
      obj['balance']-=10;
      res.send(`你还剩${obj['balance']}`)
    } else {
      kaiKa()
    }
  } else {
    kaiKa()
  }
  // 创建session, 并在服务器中保存session数据
  function kaiKa () {
    // sessionID要唯一
    let sessionID = uuid.v4()
    sessions[sessionID] = { balance: 100 }
    res.cookie(SESSION_KEY, sessionID)
    res.send(`welcome 余额100`)
  }
})

app.listen(8080)