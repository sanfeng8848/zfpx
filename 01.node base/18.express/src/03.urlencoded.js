const qs = require('qs')
const querystring = require('querystring')


// 处理请求体的中间件
function urlencoded (options) {
  let { extended } = options
  return function (req, res, next) {
    let contentType = req.headers['content-type']
    if (contentType === 'application/x-www-form-urlencoded') {
      let buffers = []
      req.on('data', data => {
        buffers.push(data)
      })
      req.on('end', () => {
        let result = buffers.toString()
        if (extended) {
          req.body = qs.parse(result)
        } else {
          req.body = querystring.parse(result)
        }
        next()
      })
    } else {
      next()
    }
  }
}

module.exports = urlencoded;