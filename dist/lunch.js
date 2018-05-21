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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/per-question/lunch.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/per-question/lunch.js":
/*!***********************************!*\
  !*** ./src/per-question/lunch.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("Qualtrics.SurveyEngine.addOnload(() => {\n  var runJavaScriptFor = Qualtrics.SurveyEngine.getEmbeddedData(\n    \"Run JavaScript For\"\n  );\n  switch (runJavaScriptFor) {\n    case \"Graduate Academic Success\":\n      var graduateAcademicSuccess2PM = Qualtrics.SurveyEngine.getEmbeddedData(\n        \"2 PM Graduate Academic Success Quota Count\"\n      );\n      var titleIX2PM = Qualtrics.SurveyEngine.getEmbeddedData(\n        \"2 PM Title IX Quota Count\"\n      );\n\n      if (graduateAcademicSuccess2PM <= titleIX2PM) {\n        var graduateAcademicSuccessTime = \"2:00 PM - 3:00 PM\";\n        var titleIXTime = \"3:00 PM - 4:00 PM\";\n      } else {\n        var titleIXTime = \"2:00 PM - 3:00 PM\";\n        var graduateAcademicSuccessTime = \"3:00 PM - 4:00 PM\";\n      }\n      Qualtrics.SurveyEngine.setEmbeddedData(\n        \"Graduate Academic Success Time\",\n        graduateAcademicSuccessTime\n      );\n      Qualtrics.SurveyEngine.setEmbeddedData(\"Title IX Time\", titleIXTime);\n      break;\n  }\n});\n\n\n//# sourceURL=webpack:///./src/per-question/lunch.js?");

/***/ })

/******/ });