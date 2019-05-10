// 把图片引入,返回的结果是一个新的图片地址, 内部会发射一个新的文件名字,生成一个hash戳的图片名称,
// 然后发射到build目录下, 并且这个abb就代表了新的图片的url
// 为了实现在js中导入图片,需要file-loader
// file-loader: 默认会在内部生成一张图片到build目录下, 把生成的图片的名称返回回来
import './index.css'
import abb from './ABB.png' 
let img = new Image()
console.log(abb)
// 这种写法,img对象认为src这个属性就是一个字符串,而不是一个图片的地址
// 并且webpack没有进行打包, 报错信息是build目录下没有这个图片ABB.png
// GET file:///C:/Users/CNZHLIU14/Desktop/zfpx/02.webpack/build/ABB.png net::ERR_FILE_NOT_FOUND
// 如何解决呢? 需要使用require这个图片,或者使用es6的import
// img.src = './ABB.png'
img.src = abb;
document.body.appendChild(img)


// import $ from 'expose-loader?$!jquery'
// import $ from 'jquery'
// console.log($)


// let str = require('./a')
// console.log(str + '123123');
// // 希望加载css模块
// require('./index.css')

// // 引入less
// require('./index.less')

// let fn = () => {
//   console.log('hello world!!!')
// }
// fn()

// // 如果只使用 @babel/preset-env 是不能编译es7语法的
// // 错误Add @babel/plugin-proposal-class-properties

// @log
// class A {
//   a = 100
// }

// let a = new A()
// console.log(a.a)

// function log (target) {
//   console.log(target, '26')
// }