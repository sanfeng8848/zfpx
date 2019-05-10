// let fs = require('fs')
// fs.readFile('./data/1.txt', function (err, data) {
//   console.log(data instanceof Buffer)
// })

let LineReader = require('./07.lineReader')

let reader = new LineReader('./data/1.txt', 'utf8');

reader.on('newLine', (data) => {
  console.log(data);
})

reader.on('end', () => {
  console.log('over');
})