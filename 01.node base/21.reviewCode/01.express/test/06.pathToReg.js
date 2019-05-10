let path = '/user/:uid'
let keys = []
function pathToReg (path, keys) {
  return path.replace(/:([^\/]+)/g, function () {
    console.log(arguments);// [Arguments] { '0': ':uid', '1': 'uid', '2': 6, '3': '/user/:uid' }
    keys.push({
      name: arguments[1],
      optional: false,
      offset: arguments[2]
    })
    return '(?:([^\/]+?))'
  })
}


let result = pathToReg(path, keys)
console.log(result) // /user/(?:([^/]+?))
console.log(keys)   // [ { name: 'uid', optional: false, offset: 6 } ]