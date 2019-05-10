read()

function read () {
  setImmediate(function () {
    console.log(1);
    setTimeout(function () {
      console.log(5);
    })
    setImmediate(function () {
      console.log(2);
      process.nextTick(function () {
        console.log(3);
      })
      setImmediate(function () {
        console.log(4);
      })
    })
  })
}