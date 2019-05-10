// console.log(global)

for (let attr in global) {
  console.log(attr)
}
/*
global:可遍历的属性
global
process
Buffer
clearImmediate
clearInterval
clearTimeout
setImmediate
setInterval
setTimeout*/
console.log("============================")
for (let attr in global.process) {
  console.log(attr)
}

/*
env
pid
argv
platform
cwd
assert
==================
nextTick
stdout
stdin
stderr

 */

 console.log(__dirname);