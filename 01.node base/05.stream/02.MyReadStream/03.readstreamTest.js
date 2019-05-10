const ReadStream = require('./02.ReadStream')
const path = require('path')

let rs = new ReadStream(path.join(__dirname, '../data/2.txt'), {
  flags: 'r',
  start: 0,
  end: 1,
  highWaterMark: 3,
  encoding: 'utf8'
})


rs.on('open', () => {
  console.log('open');
})
rs.on('close', () => {
  console.log('close');
})
rs.on('error', err => {
  console.log(err);
})
rs.on('data', data => {
  console.log(data)
})
rs.on('end', (data) => {
  console.log('end', data);
})
