/**
 * session的原理
 * 1. 服务器生成一个唯一的id, 客户端第一次请求时, 把这个id发给客户端
 * 2. 借助cookie, 把id存为cookie, client下一次request时,发给server
 * 3. server根据cookie中的id, 在redis或者sql中查询这个id的相关信息(object)
 * 4. 然后进行相关的业务处理
 */

let express = require('express')
let uuid = require('uuid')
let cookieParser = require('cookie-parser')
let app = express()
app.use(cookieParser('hello'))

const SESSION_KEY = 'connect.sid'

app.listen(8080, function () {
  console.log('server start...');
})

let sessions = {}

app.get('/', function (req, res) {
  let sessionId = req.cookies[SESSION_KEY]
  if (sessionId) {
    let sessionObj = sessions[sessionId]
    if (sessionObj) {
      sessionObj['balance'] -= 10;
      res.send(`还剩余额为${sessionObj['balance']}`)
    } else {
      // 加入session在服务器端丢失了, 根据sessionId找不到session,那么就重新创建一个session
      createSession(req, res)
    }
  } else {
    // 没有sessionId,说明服务器从来没有创建过session
    createSession(req, res)
  }
})

function createSession(req, res) {
  let sessionId = uuid.v4()
  sessions[sessionId] = { balance: 100 }
  res.cookie(SESSION_KEY, sessionId)
  res.send(`欢迎新客户,送你一张会员卡，余额100`)
}