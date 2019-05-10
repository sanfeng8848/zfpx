let arr = [1,2,3,4,5]
let res = arr.find(item => {
  if (item > 2)
    return item
})
console.log(res)