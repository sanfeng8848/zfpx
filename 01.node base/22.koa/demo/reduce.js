let arr = []
for (let i = 1; i <= 100; i++) {
  arr.push(i)
}

// 箭头函数的方式, 如果加了{} 就必须要加上return
let sum = arr.reduce(
  (total, current) => total + current
  , 0)
console.log(sum)


let obj = {
  name: 'sanfeng',
  age: 10
}

let array = [
  {
    name: 'sanfeng',
    age: 10
  },
  {
    name: 'lisi',
    age: 20
  },
  {
    name: 'wwww',
    age: 50
  }
]

let total = array.reduce((sum, current) => {
  return current.age + sum
}, 0)
console.log(total)

// 将二维数组转化为一维
let twoArray = [[1, 2], [3, 4], [5, 6]]

let newArray = twoArray.reduce((newArray, current) => {
  return newArray.concat(current)
}, [])
console.log(newArray);


// 计算数组中每个元素出现的次数
let mm = [1, 2, 3, 2, 2, 3, 4, 5, 34, 3]
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
// all是个对象, 数组中的元素作为对象的key
let countName = names.reduce((all, current) => {
  if (current in all) {
    all[current]++
  } else {
    all[current] = 1
  }
  return all;
}, {})
console.log(countName)






// 以下是错的
// let newObj = {}
// let result = mm.reduce((total, current) => {
//   if (newObj[current]) {
//     newObj[current]++
//   } else {
//     newObj[current] = current;
//   }
//   return newObj;
// }, 0)

// console.log(result);



// 按属性对object分类, fn: groupBy(people, 'age') --> 按照age分组
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 10 }
];



// 遍历数组的每个元素, 根据业务逻辑处理每个元素的数据, 最后将结果累加到函数中的第一个参数上
let groupBy = function (objectArray, attr) {
  return objectArray.reduce((res, currentObj) => {
    let key = currentObj[attr] // 返回具体的age的值 21 20 10
    if (!res[key]) {
      res[key] = []
    } else {
      res[key].push(currentObj)
    }
    return res;
  }, {})
}
let res = groupBy(people, 'age')






// function groupBy (objectArray, attr) {
//   return objectArray.reduce((res, currentObj) => {
//     let key = currentObj[attr]
//     if (!res[key]) {
//       res[key] = []
//     }
//     res[key].push(currentObj)
//     return res;
//   }, {})
// }

// let groupedPeople = groupBy(people, 'age')
// console.log(groupedPeople);


