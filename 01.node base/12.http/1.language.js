/**
 * 通过curl来设置请求头字段, 来验证多语言
 * curl -v --header "Accept-Language: zh-CN" http://localhost:8080
 */
let http = require('http')
let url = require('url')
let server = http.createServer(request)
server.listen(8080, function () {
  console.log('server start');
})

let lanPack = {
  'zh-CN': {
    title: '欢迎光临',
    username: '三疯',
    age: 30
  },
  // 'zh': {
  //   title: '繁体字的欢迎光临'
  // },
  en: {
    title: 'welcome',
    username: 'sanfeng',
    age: 30
  },
  // 默认语言
  default: 'en'
}

function request(req, res) {
  let { pathname } = url.parse(req.url, true)
  if (pathname.includes('/favicon')) return
  // req.headers['Accept-Language'] = 'zh-cn,zh;q=0.5'
  // req.setHeader('Accept-Language', 'zh-cn,zh;q=0.5')
  let acceptLanguage = req.headers['accept-language']
  console.log(acceptLanguage)
  if (acceptLanguage) {
    let result = acceptLanguage.split(',').map(item => {
      let values = item.split(';')
      let name = values[0]
      let q = values[1] ? values[1].split('=')[1] : 1
      return {
        name, q
      }
    })
    // 高阶函数箭头函数中直接写表达式的,默认return, 多行的必须return
    result.sort((a, b) => b.q - a.q)
    // 在没有匹配的情况下, 使用默认语言
    let lan = lanPack.default;
    // 循环result, 匹配语言包, 优先匹配到就使用哪种语言类型
    for (let i = 0; i < result.length; i++) {
      if (lanPack[result[i].name]) {
        lan = result[i].name;
        break;
      }
    }
    // 防止乱码
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    // res.setEncoding('utf8');
    // 使用自己或权威的语言包进行转换, 或者封装个方法 getLan('title')
    console.log(lanPack[lan]['username']);
    res.end(lanPack[lan]['username'])
  }
}