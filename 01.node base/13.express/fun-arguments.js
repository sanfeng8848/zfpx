let fn = function (err, req, res, next) {
  console.log(err, req, res, next)
}

fn(1,2,3,4)
console.log(fn.length)