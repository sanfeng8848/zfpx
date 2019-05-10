let querystring = require('querystring')
let qs = require('qs')

let obj = { name: 'sanfeng', home: { region: 'north', address: 'beijing' } }

let r = querystring.stringify(obj)    // 对象转查询字符串, 只能处理非嵌套的对象
console.log(r)    // name=sanfeng&home=

let s = qs.stringify(obj)
console.log(s); // name=sanfeng&home%5Bregion%5D=north&home%5Baddress%5D=beijing