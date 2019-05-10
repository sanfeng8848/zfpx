/**
 * 1. 写一个聊天室, 可以设置昵称 可以广播
 */
const net = require('net')
// 存储客户信息, key: 用户名 value: socket
let clients = {}

const server = net.createServer((socket) => {
  socket.setEncoding('utf8')
  server.getConnections((err, count) => {
    socket.write(`欢迎光临, 当前人数 ${count}, 请输入用户名昵称\r\n`)
  })
  // 1. 给username赋值
  let username
  socket.on('data', data => {
    data = data.replace(/\r\n/, '')
    // 如果已经赋值,说明已经不是第一次说话,直接广播即可
    if (username) {
      // 广播给出username的所有在线用户
      broadCast(username, `${username}: ${data}`)
    } else {
      // 如果有重名, 进行提示
      if (clients[data]) {
        socket.write('你的用户名已经被人用了，请你换个新的用户名吧\r\n')
      } else {
        username = data;
        // 缓存每个用户的socket对象, 用于广播
        clients[username] = socket
        broadCast(username, `欢迎${username}进入聊天室`)
      }
    }
  })
  socket.on('end', () => {
    broadCast(username, `欢送${username}离开`)
    // 离开就要销毁
    clients[username] && clients[username].destroy()
    delete clients[username]
  })
})

// 广播给除username以外的所有用户 clients[]
function broadCast (username, msg) {
  for (let name in clients) {
    if (username != name) {
      clients[name].write(msg + '\r\n')
    }
  }
}

server.listen(8080, () => {
  console.log('TCP聊天室已经启动成功, 服务器端地址是:', server.address());
})