require('@babel/polyfill')


class B {

}

function * gen () {
  yield 1;
}

console.log(gen().next());

let aa = 'aaa'.includes('a')
console.log(aa)

module.exports = 'hello world sanfeng'