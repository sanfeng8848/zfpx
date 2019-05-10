
// 字符串转对象
function json () {
  return function (req, res, next) {
    let contentType = req.headers['content-type']
    if (contentType == 'application/json') {
      let buffers = []
      req.on('data', data => {
        buffers.push(data)
      })
      req.on('end', () => {
        let result = buffers.toString()
        req.body = JSON.parse(result)
        next()
      })
    } else {
      next()
    }
  }
}

module.exports = json;