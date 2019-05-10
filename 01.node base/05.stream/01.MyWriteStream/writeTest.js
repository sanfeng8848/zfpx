const WriteStream = require('./MyWriteStream')

let ws = new WriteStream('./2.txt', {
  highWaterMark: 3
})

let n = 9

function write () {
  let flag = true
  while (flag && n >= 0) {
    flag = ws.write(n+"", 'utf8')
    n--;
    console.log(flag)
  }
}
ws.on('drain', () => {
  flag = true
  console.log('drain')
  write()
})

write()
