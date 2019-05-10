let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('fs')

const whiteList = [
  '10.138.166.22',
  'localhost'
]

let server = http.createServer((req, res) => {
  // let { pathname } = url.parse(req.url, true)
  // if (pathname.includes('/favicon')) return;
  // referer从英文的正确拼法来讲,正确的是referrer, 多了个r, 早起的错误, 为了向后兼容
  // 有refer, 说明是html的引用, src, 或者css的@import, background的url等
  let refer = req.headers['referer'] || req.headers['referrer'] // 请求头都是小写的
  // 判断refer 和 资源域名是否一致 (比如本地起了一个服务, ip： http://10.138.166.22:8000/,)
  // 资源域名是百度, 如果不一致, 就说明被请求的资源不是从百度域名请求的, 而是别的服务域名的资源请求, 盗取资源了
  if (refer) {
    // 获取引用的地址 http://10.138.166.22:8000/2.refer.html
    let referHostName = url.parse(refer, true).hostname
    let currentHostName = url.parse(req.url, true).hostname
    // if (referHostName != currentHostName) {
    if (referHostName != currentHostName && whiteList.indexOf(referHostName) == -1) {
      res.setHeader('Content-Type', 'image/jpg')
      fs.createReadStream(path.join(__dirname, 'public', 'forbidden.jpg')).pipe(res)
      return;
    }
  }
  res.setHeader('Content-Type', 'image/png')
  fs.createReadStream(path.join(__dirname,'public', 'man.png')).pipe(res)
})
server.listen(3000, () => {
  console.log('started...')
})
 