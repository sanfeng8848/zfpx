import React from 'react'
import { render } from 'react-dom'

render(<h1>jsx111</h1>, window.root)

import calc from './test'
console.log(calc.sum(1, 2))

// scope hosting 作用域提升
let a = 1;
let b = 2;
let c = 3;
let d = a + b +c;
console.log(d, '----------------')


// import jquery from 'jquery'
// import moment from 'moment'

// // 手动引入特定的语言包
// import 'moment/locale/zh-cn'

// // 设置moment显示的语言包
// moment.locale('zh-cn')

// let r = moment().endOf('day').fromNow();

// console.log(r)