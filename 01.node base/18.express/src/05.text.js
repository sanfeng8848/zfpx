function text () {
  return function (req, res, next) {
    let contentType = req.headers['content-type']
    if (contentType == 'text/plain') {
      let buffers = []
      req.on('data', data => {
        buffers.push(data)
      })
      req.on('end', function () {
        req.body = buffers.toString()
        next()
      })
    } else {
      next()
    }
  }
}
module.exports = text;