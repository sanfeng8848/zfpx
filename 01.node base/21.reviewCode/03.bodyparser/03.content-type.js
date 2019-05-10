let type = require('content-type')
let contentType = 'text/plain; charset=gbk'
let result = type.parse(contentType)
console.log(result)
console.log(result.parameters.charset)  // gbk
console.log(result.type);   // 'text/plain'