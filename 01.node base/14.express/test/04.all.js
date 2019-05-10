var express = require('express');//引入express
var app = express();
let status_code = require('_http_server').STATUS_CODES

console.log(status_code);
// app.all("*",function(req,res){
//   console.log(req.url);
//  res.send("404");
// })

// app.get('/', function (req,res) {
//   // res.send('<div>hello world</div>');
//   res.send('<strong>hello world123</strong>')
// });

app.get('/json', function (req, res) {
  res.send({ obj: 1 });
});
app.get('/arr', function (req, res) {
  res.send([1, 2, 3]);
});
app.all('/statuscode', function (req, res) {
  res.end(status_code['304'])
})
app.listen(3000);