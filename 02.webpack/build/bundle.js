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
/******/ 	__webpack_require__.p = "";
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
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,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\"\n\n//# sourceURL=webpack:///./src/ABB.png?");

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