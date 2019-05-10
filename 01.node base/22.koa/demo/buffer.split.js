let buf = Buffer.from('herrr,ll,o')
console.log(buf);
Buffer.prototype.split = function (sep) {
  let searchStart = 0;
  let sepLength = sep.length;
  let currentFindIndex = -1;  // 当前查找到分隔符的下标, 初始化为-1
  let result = []
  while((currentFindIndex = this.indexOf(sep, searchStart)) != -1) {
    result.push(this.slice(searchStart, currentFindIndex))
    searchStart = currentFindIndex + sepLength;
  }
  // 最后将分隔符后面的加入到结果数中
  result.push(this.slice(searchStart))
  return result;
}
let arr = buf.split(',')
console.log(arr)

module.exports = function split (buf, sep) {
  let searchStart = 0;
  let sepLength = sep.length;
  let currentFindIndex = -1;  // 当前查找到分隔符的下标, 初始化为-1
  let result = []
  while((currentFindIndex = buf.indexOf(sep, searchStart)) != -1) {
    result.push(buf.slice(searchStart, currentFindIndex))
    searchStart = currentFindIndex + sepLength;
  }
  // 最后将分隔符后面的加入到结果数中
  result.push(buf.slice(searchStart))
  return result;
}


