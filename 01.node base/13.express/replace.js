let str = '/user/:name/:age'
let paramsNames = []

str.replace(/:([^\/]+)/g, function () {
  // console.log(arguments[0]);
  // console.log(arguments[1]);
  paramsNames.push(arguments[1])
})

console.log(paramsNames);