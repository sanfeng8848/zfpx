Buffer.myConcat = function (list, totalSize = 0) {
  if (!Array.isArray(list)) {
    throw new Error('不是数组!')
  }
  if (list.length === 1) {
    return list[0]
  }
  // 合并后的默认总长度
  totalSize = list.reduce((len, item) => len + item.length, 0)
  // Buffer是固定长度的, 开辟空间
  let result = Buffer.alloc(totalSize)
  let index = 0
  for (let buf of list) {   // buf: list中的每个buf
    for (let b of buf) {    // b: 每个字节
      if (index >= totalSize) {   // 如果越界了, 直接返回
        return result
      } else {
        result[index++] = b
      }
    }
  }
  return result
}


let buf1 = Buffer.from('人')
let buf2 = Buffer.from('民')

try {
  let res = Buffer.myConcat({buf1, buf2})
  console.log(res)
} catch (e) {
  console.log(e.message)
}

