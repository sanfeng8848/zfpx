let reg = /(hello \S+)/g;
let matches = reg.exec('This is hello world hello sanfeng')
console.log(matches);
console.log(typeof matches)
console.log(matches.length)
for (let i = 0; i < matches.length; i++) {
  console.log(matches[i])
}

console.log(matches[0])
console.log(matches[1])