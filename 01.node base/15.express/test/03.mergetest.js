const mixin = require('merge-descriptors')

let app = function () {
  console.log('app');
}
const proto = Object.create(null)
proto.listen = function () {
  console.log(this === app);
  // console.log(this === proto);
}
mixin(app, proto, false)
console.log('proto.listen')
proto.listen()
console.log('app.listen')
app.listen()


