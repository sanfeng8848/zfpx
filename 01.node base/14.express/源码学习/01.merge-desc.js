let src = {
  name: 'sanfeng',
  age: 19
}

let dest = {
  name: 'dest',
  sex: 'M',
  hobby: 'abc',
  study: 'xxx'
}

let hasOwnProperty = Object.prototype.hasOwnProperty;

Object.getOwnPropertyNames(src).forEach((item) => {
  // 如果目标对象中的属性和源对象重复了, 不处理, return
  if (hasOwnProperty.call(dest, item)) {
    console.log(dest, item)
    return;
  }

  var desc = Object.getOwnPropertyDescriptor(src, item)
  Object.defineProperty(dest, item, desc)
})

console.log('===============')
console.log(src)
console.log(dest)

