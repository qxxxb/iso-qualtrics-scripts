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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/per-question/graduate-mandatory-sessions.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/per-question/graduate-mandatory-sessions.js":
/*!*********************************************************!*\
  !*** ./src/per-question/graduate-mandatory-sessions.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("Qualtrics.SurveyEngine.addOnload(() => {\n  var mandatorySessionsMultipurposeRoom = Qualtrics.SurveyEngine.getEmbeddedData(\n    \"Multipurpose Room Mandatory Sessions Quota Count\"\n  );\n  var mandatorySessionsTheater = Qualtrics.SurveyEngine.getEmbeddedData(\n    \"Theater Mandatory Sessions Quota Count\"\n  );\n\n  if (mandatorySessionsMultipurposeRoom <= mandatorySessionsTheater) {\n    var mandatorySessionLocation = \"Baker Center, Multipurpose Room\";\n  } else {\n    var mandatorySessionLocation = \"Baker Center, Theater\";\n  }\n  Qualtrics.SurveyEngine.setEmbeddedData(\n    \"Mandatory Session Location\",\n    mandatorySessionLocation\n  );\n});\n\n\n//# sourceURL=webpack:///./src/per-question/graduate-mandatory-sessions.js?");

/***/ })

/******/ });