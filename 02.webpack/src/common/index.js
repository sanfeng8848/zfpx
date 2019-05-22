import 'bootstrap'
import '../style/resolve.css'

let url = ''
if (DEV === 'production') {
  url = 'http://localhost:8080'
} else {
  url = 'http://www.baidu.com'
}

console.log("url --- ", url);

console.log("FLAG ", FLAG)
console.log(EXPRESSION);