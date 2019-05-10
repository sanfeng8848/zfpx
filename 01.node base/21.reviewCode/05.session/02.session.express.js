let express = require('express')
let session = require('express-session')
let uuid = require('uuid')
let app = express()

// s%3Acb1330a8-54c6-4b10-835e-46ea16f92491.z1F%2Bv8Tt%2Bh8FNzCLY97n0Jj4bNtR62IRQ8FBX3mktgc
// s%3A8Q04Nm0pty5Ijpd7rg6BOIz0KNsiok4b.WZi824IyGlBQYfKgWwBPcdZgKWapneLo4DhofhYCVfg
app.use(session({
  name: 'sessionID',
  resave: true,
  saveUninitialized: true,
  rolling: true,
  secret: 'hello',
  genid: function () {
    return uuid.v4()
  },
  cookie: {
    maxAge: 5 * 1000
  }
}))

app.get('/', function (req, res) {
  let views = req.session.views
  if (views) {
    views++
  } else {
    views = 1
  }
  req.session.views = views
  res.send(`欢迎你的第${views}次访问`)
})  


app.listen(8080, function () {
  console.log('server start...');
})