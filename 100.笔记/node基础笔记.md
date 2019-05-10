### node 基础

-----------

#### 1. Buffer方法
```javascript
/**
 * buffer 本身就是字节数组!!!
 * 入参:
 * 1. 要合并的buffer数组或者buffer
 * 2. 合并后的buffer总长度(默认是多个buffer的total.length), 也可以自定义合并"截取"后的大小
 * totalSize: list中所有buffer长度之和
 */
Buffer.myConcat = function (list, totalSize = 0) {
  if (!Array.isArray(list)) {
    throw new Error('不是数组!')
  }
  if (list.length === 1) {
    return list[0]
  }
  // 合并后的默认总长度
  totalSize = list.reduce((len, item) => len + item.length, 0)
  // Buffer是固定长度的, 开辟空间
  let result = Buffer.alloc(totalSize)
  let index = 0
  for (let buf of list) {   // buf: list中的每个buf
    for (let b of buf) {    // b: 每个字节
      if (index >= totalSize) {   // 如果越界了, 直接返回
        return result
      } else {
        result[index++] = b
      }
    }
  }
  return result
}


let buf1 = Buffer.from('人')
let buf2 = Buffer.from('民')

try {
  let res = Buffer.myConcat({buf1, buf2})
  console.log(res)
} catch (e) {
  console.log(e.message)
}

```

> 知识点补充 base64
- Base64就是一种基于64个可打印字符来表示二进制数据的方法
- Base64编码会把3字节的二进制数据编码为4字节的文本数据，长度增加33%，好处是编码后的文本数据可以在邮件正文、网页等直接显示。
- 如果要编码的二进制数据不是3的倍数，最后会剩下1个或2个字节怎么办？Base64用\x00字节在末尾补足后，再在编码的末尾加上1个或2个=号，表示补了多少字节，解码的时候，会自动去掉。


缓存
https://blog.csdn.net/TDCQZD/article/details/81950576
https://www.cnblogs.com/ppoo24/p/5963037.html
https://www.imooc.com/article/details/id/22841
https://juejin.im/post/5c938812e51d4539fc2d61a5

![01.linux权限位](C:\Users\CNZHLIU14\Desktop\zfpx\100.笔记\img\01.linux权限位.png)


### 国际化
- 获取请求头字段'Accept-Language', 根据,拆分 然后获取可接受的语言类型的权重q, 排序
- 遍历请求头字段, 在语言包找是否存在, 存在就返回这种语言
- 最后返回客户端的字段内容, 使用语言包对应的语言中设置的字段内容, 如返回zh-CN对象中的属性内容
- 如果没有zh-CN, 再继续找有没有, 没有使用default en
```js
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
```
```js
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
  let acceptLanguage = req.headers['accept-language']
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
    // 使用自己或权威的语言包进行转换, 或者封装个方法 getLan('title')
    res.end(lanPack[lan]['username'])
  }
}
```


#### 关于缓存
> https://imweb.io/topic/55c6f9bac222e3af6ce235b9

```js
浏览器的缓存有 2 种
一种叫验证性缓存，用 ETag 、 Last-Modified 、 If-None-Match 、 If-Modified-Since 来控制，其特点是会发一个请求给服务器来确认缓存是否有效，如果有效就返回 304 ，省去传输内容的时间
另一种叫非验证性缓存，或者有些人称为强缓存，用 Cache-Control 、 Expires 、 Pragma 来控制，其特点是一但有效就在有效期内不会发任何请求到服务器

从描述也能很容易看出来，非验证性缓存的优先级是高于验证性缓存的，因为有它在就根本不会发请求，自然也没有什么 If-None-Match 之类的东西出现的机会了
你看到的 200 from memory cache 就是非验证性缓存

那么为什么在 Chrome 下会有非验证性缓存呢？就是因为你没有设置 Cache-Control 这个头，没有这个头的话，其默认值是 Private ，在标准中也明确说了：

Unless specifically constrained by a cache-control 
directive, a caching system MAY always store a successful response 

翻译一下：如果没有 Cache-Control 进行限制，缓存系统**可以**对一个成功的响应进行存储

很显然， Chrome 是遵守标准的，它在没有检查到 Cache-Control 的时候对响应做了非验证性缓存，所以你看到了 200 from memory cache
同时 Safari 也是遵守标准的，因为标准只说了**可以**进行存储，而非**应当**或者**必须**，所以 Safari 不进行缓存也是合理的

我们可以理解为，没有 Cache-Control 的情况下，缓存不缓存就看浏览器高兴，你也没什么好说的。那么你如今的需求是“明确不要非验证性缓存”，则从标准的角度来说，你**必须**指定相应的 Cache-Control 头
```

#### 防盗链
> https://juejin.im/post/5bbc5d1ee51d450e3e16db9a
> https://juejin.im/post/5b7919345188254312414b9c
> https://juejin.im/post/5adc0d03518825673a2022b7

```js
注意：具备防盗链处理的网站的资源链接可以直接通过浏览器地址栏访问，也可以在文件域（file 协议）访问，限制的是在未经允许的情况下其他服务器的访问
```
> 步骤
- 1. 启动图片服务器的程序, 如2.refer.js, 判断请求头的referer和图片源host是否一致或者在白名单
- 2. 模拟另一个服务器(比如http-server), 请求html, html中有关于图片请求资源的操作 <img src='xxxx'> xxx就是图片源地址

#### express 源码分析
https://juejin.im/post/59c0ef425188257e934966ad#heading-3

#### 错误处理next(err)
- 发生的位置: 路由中的route, 处理函数中handler, 调用next方法中传递字符串next('error')
1. 在路由模块中, route中的处理函数 dispatch中的, next函数中处理
2. 然后,
```

```

#### express流程
1. Application.prototype[method]
  - this.lazyrouter() --> app._router   将路由数组挂载到app应用实例上
    - 调用 app._router[method] 



#### cookie属性关键点
> 当使用curl等命令行方式, cookie就是可以篡改的
- curl -H "Cookie:password=xxx" http://localhost:8080/user
- 结果就是 欢迎xxx 登录
```js
app.cookie('password', '123', {
  httpOnly: true
})
```
- maxAge, expires 都是以毫秒为单位
- 当设置了两个值, maxAge的优先级高
```js
// 设置5秒的过期时间
res.cookie('age', 10, {
  maxAge: 10 * 1000,    // 相对请求时10s后cookie过期
  expires: new Date(Date.now() + 5 * 1000)  // 相对统一时间UTC 5s后cookie过期
})

```
