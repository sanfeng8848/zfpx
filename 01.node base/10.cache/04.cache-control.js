// 强制缓存, 不需要向服务器发送比较验证
let http = require('http')
let url = require('url')
let fs = require('fs')
let path = require('path')
let mime = require('mime')

http.createServer((req, res) => {
  let { pathname } = url.parse(req.url, true)
  let filepath = path.join(__dirname, pathname)
  console.log(filepath);
  fs.stat(filepath, (err, stat) => {
    if (err) {
      return sendError(req, res)
    } else {
      send(req, res, filepath)
    }
  })
}).listen(8080, () => {
  console.log('start')
})


function send(req, res, filepath) {
  // 设置响应头
  // res.setHeader('Content-Type', mime.getType(filepath))
  // res.setHeader('Expires', new Date(Date.now() + 30 * 1000).toUTCString());
  // res.setHeader('Cache-Control', 'max-age=30')
  // // res.setHeader('Expires', new Date(Date.now() + 30 * 1000).toUTCString())
  // fs.createReadStream(filepath).pipe(res)


  res.setHeader('Content-Type', mime.getType(filepath));
  //expires指定了此缓存的过期时间，此响应头是1.0定义的，在1.1里面已经不再使用了
  res.setHeader('Expires', new Date(Date.now() + 30 * 1000).toUTCString());
  res.setHeader('Cache-Control', 'max-age=30');
  fs.createReadStream(filepath).pipe(res);
}
