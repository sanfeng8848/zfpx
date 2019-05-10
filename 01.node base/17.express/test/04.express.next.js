let stack = [
  function (next) {
    console.log(1);
    next()
  },
  function (next) {
    console.log(2);
    next()
  }
]

let idx = 0;
function next () {
  if (idx >= stack.length) {
    return;
  }
  let fn = stack[idx++]
  fn(next)
}
next();
// express: 线性的, 存放在数组中

// koa的逻辑 洋葱模型,嵌套性
function first () {
  console.log('first start');
  function second () {
    console.log('second start');
    function third () {
      console.log('third start')
      console.log('third end')
    }
    third()
    console.log('second end');
  }
  second()
  console.log('first end');
}
first()