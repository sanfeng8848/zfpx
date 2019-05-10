/**
 * 函数嵌套调用
 * 调用栈
 * 1. 空函数
 * 2. 嵌套函数调用
 * 
 */

let noop = () => {}

let f1 = () => {
  console.log(1);
  f2()
  console.log(2);
}

let f2 = () => {
  console.log(3);
  f3()
  console.log(4);
}

let f3 = () => {
  console.log(5);
  debugger
  noop()
  console.log(6);
}
f1()
