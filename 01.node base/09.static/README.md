## 静态文件服务器
可以在任意目录下启动一个静态文件服务器，并且把当前目录 做为静态文件根目录
```
zf-server -d 指定静态文件根目录 -p 指定端口号 -o 指定监听的主机 
```

### debug模块
- 定制输出内容
- 设置环境变量为static:app才会输出debug的内容 `set DEBUG=static:app`
- 如果想输出所有的debug的内容 可以使用 `set DEBUG=static:*`
```javascript
// app.js
let debug = require('debug')('static:app')

debug(`hello world...`)
```

```javascript
// config.js
// 参数的规范: 项目名static:模块名config  --> static:config
let debug = require('debug')('static:config')
let config = {
  host: 'localhost',
  port: 8080,
  root: process.cwd()
}
debug(config)     // 是否输出取决于环境变量中DEBUG的设置
module.exports = config;
```


### supervisor
