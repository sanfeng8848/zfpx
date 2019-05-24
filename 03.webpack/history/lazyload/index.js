// 在页面中创建一个button, 点击按钮, 然后加载js文件进行请求数据

// let button = document.createElement('button')
// button.innerHTML = 'click me'
// // vue react中的路由懒加载的原理
// button.addEventListener('click', function () {
//   // 返回值是个promise对象, 返回的data是es6的默认导出对象default
//   // import 是es6草案中的语法 jsonp实现动态加载文件
//   import('./lazyload.js').then(data => {
//     console.log(data.default);
//   })
// }, false)

// document.body.appendChild(button)

// import str from './lazyload'
// console.log(str);

if (module.hot) {
  module.hot.accept('./lazyload.js', () => {
    console.log('文件更新了');
    let str = require('./lazyload.js')    // 只能使用require, 因为import必须写在顶端
    console.log(str)
  })
}
