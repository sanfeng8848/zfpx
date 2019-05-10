setTimeout(()=>{
  console.log(1) 
},0)
Promise.resolve().then(()=>{
  console.log(2) 
})
process.nextTick(() => {
  console.log(4);
})
console.log(3) 