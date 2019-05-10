/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://www.baidu.com";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ABB.png":
/*!*********************!*\
  !*** ./src/ABB.png ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"/img/d0a8db712fa8be15a60fe9a14d1dc9af.png\";\n\n//# sourceURL=webpack:///./src/ABB.png?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/index.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ABB_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ABB.png */ \"./src/ABB.png\");\n/* harmony import */ var _ABB_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ABB_png__WEBPACK_IMPORTED_MODULE_1__);\n// 把图片引入,返回的结果是一个新的图片地址, 内部会发射一个新的文件名字,生成一个hash戳的图片名称,\n// 然后发射到build目录下, 并且这个abb就代表了新的图片的url\n// 为了实现在js中导入图片,需要file-loader\n// file-loader: 默认会在内部生成一张图片到build目录下, 把生成的图片的名称返回回来\n\n\nvar img = new Image();\nconsole.log(_ABB_png__WEBPACK_IMPORTED_MODULE_1___default.a); // 这种写法,img对象认为src这个属性就是一个字符串,而不是一个图片的地址\n// 并且webpack没有进行打包, 报错信息是build目录下没有这个图片ABB.png\n// GET file:///C:/Users/CNZHLIU14/Desktop/zfpx/02.webpack/build/ABB.png net::ERR_FILE_NOT_FOUND\n// 如何解决呢? 需要使用require这个图片,或者使用es6的import\n// img.src = './ABB.png'\n\nimg.src = _ABB_png__WEBPACK_IMPORTED_MODULE_1___default.a;\ndocument.body.appendChild(img); // import $ from 'expose-loader?$!jquery'\n// import $ from 'jquery'\n// console.log($)\n// let str = require('./a')\n// console.log(str + '123123');\n// // 希望加载css模块\n// require('./index.css')\n// // 引入less\n// require('./index.less')\n// let fn = () => {\n//   console.log('hello world!!!')\n// }\n// fn()\n// // 如果只使用 @babel/preset-env 是不能编译es7语法的\n// // 错误Add @babel/plugin-proposal-class-properties\n// @log\n// class A {\n//   a = 100\n// }\n// let a = new A()\n// console.log(a.a)\n// function log (target) {\n//   console.log(target, '26')\n// }\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });