/**
 * 路径分组
 * curl -X POST/GET/DELETE/PUT http://localhost:8080/user
 */

const express = require('express')
const app = express()

app.route('/user')
  .get(function (req, res) {
    res.end('get')
  })
  .post(function (req, res) {
    res.end('post')
  })
  .delete(function (req, res) {
    res.end('delete')
  })
  .put(function (req, res) {
    res.end('put')
  })

app.listen(8080, () => {
  console.log('server start...')
})