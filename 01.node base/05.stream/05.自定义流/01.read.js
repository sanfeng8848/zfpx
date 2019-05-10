const fs = require('fs')
const path = require('path')

let rs = fs.createReadStream(path.join(__dirname, '../data/5.txt'), {
  start: 3,
  end: 8,
  highWaterMark: 3
})

rs.on('open', () => {
  console.log('open');
})
rs.on('data', (data) => {
  console.log(data);
})
rs.on('end', () => {
  console.log('end');
})
rs.on('close', () => {
  console.log('close');
})
rs.on('error', () => {
  console.log('error');
})