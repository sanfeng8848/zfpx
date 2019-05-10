// const ex = require('./express')
// let test = ex()
// test()


let arr = [1,2,3,4,5]
let num = 3
arr.forEach(item => {
  if (item == num) {
    // break;   // 报错
    return;     // 不会报错,但是不会退出循环
  }
  console.log(item);
})

console.log('使用some')

// some()当内部return true时跳出整个循环
arr.some(item => {
  if (item == num) {
    return true;
  }
  console.log(item)
})

// every()当内部return false时跳出整个循环
console.log('使用every');

arr.every(item => {
  if (item == num) {
    return false
  } else {
    console.log(item);
    return true;
  }
})