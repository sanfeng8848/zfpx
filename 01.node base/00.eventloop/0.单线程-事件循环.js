// 1.
function read () {
  console.log(1)
  setTimeout(function () {
    console.log(2)
    setTimeout(function () {
      console.log(4)
    })
  })
  setTimeout(function () {
    console.log(5)
  })
  console.log(3)
}

// read()

// 事件是什么时候放入到callback队列里的，是发送ajax就加入队列，还是ajax返回数据的时候加入队列?
// 2. 异步任务执行成功完成之后，才放入事件callback队列中，然后根据node的event loop机制，从队列的头部取出callback放入执行栈中去执行代码
// function read2 () {
//   console.log(1)
//   ajax()
//   setTimeout(function () {
//     console.log(2)
//   }, 1000)
// }

//3. 异步回调函数都放在事件队列里，同步回调不会放到callback queue中，同步的函数直接放在stack直接执行


// process.nextTick
// nextTick 是把这个回调函数放在当前执行栈的尾部
function next () {
  console.log(1)
  setTimeout(function () {
    console.log(2)
  })
  process.nextTick(function () {
    console.log(3)
    process.nextTick(function () {
      console.log(4)
      process.nextTick(function () {
        console.log(5)
      })
    })
  })
}

next()











