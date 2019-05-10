/*
nextTick:     把回调函数放在当前执行栈的底部   先执行
setImmediate: 把回调函数放在事件队列的尾部     后执行

如果是希望立即返回的，使用nextTick，如果不太重要的，setImmediate
nextTick会阻塞进程, setImmediate 放到了事件队列的尾部,

 */
// 0
// -1
// -2
// 1
// 2
// 3
// 4
read()
function read () {
  setImmediate(function () {
    console.log(1)
    process.nextTick(function () {
      console.log(2)
      process.nextTick(function () {
        console.log(3)
      })
      setTimeout(function () {
        console.log(5);
      }, 0)
      setImmediate(function () {
        console.log(4);
      })
    })
  })
  process.nextTick(function () {
    console.log(0)
  })
  process.nextTick(function () {
    console.log(-1)
  })
  process.nextTick(function () {
    console.log(-2);  
  })
}