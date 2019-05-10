/**
 * sort方法会改变原数组
 */
let arr = [1, 2, 3, 100, 200]
arr.sort()
console.log(arr)

let newArr = arr;
// 升序
newArr.sort((a, b) => {
  return a - b
})
// 降序
newArr.sort((a, b) => {
  return b - a
})
console.log(newArr);


let stu = [
  {
    name: 'sanfeng',
    age: 1
  },
  {
    name: 'sanfeng',
    age: 2
  },
  {
    name: 'sanfeng',
    age: 11
  },
  {
    name: 'sanfeng',
    age: 8
  }
]

// ascii码排序
// stu.sort(item => item.age)
// console.log(stu)

// 对象组成的数组的排序, 根据对象中的某个值进行排序
// stu.sort((a, b) => {
//   return a.age - b.age
// })
// console.log(stu)

// stu.sort((a, b) => {
//   return b.age - a.age
// })
// console.log(stu)


let arr1 = [1, 2, 11, 8]
// arr1.sort((a, b) => b - a)
// console.log(arr1);
console.log(arr1.sort())