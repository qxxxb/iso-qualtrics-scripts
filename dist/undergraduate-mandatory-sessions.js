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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/per-question/undergraduate-mandatory-sessions.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/per-question/undergraduate-mandatory-sessions.js":
/*!**************************************************************!*\
  !*** ./src/per-question/undergraduate-mandatory-sessions.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("Qualtrics.SurveyEngine.addOnload(() => {\n  var maximumOccupancy = 35;\n\n  var slots = [];\n  slots.push({\n    room: 129,\n    occupants: Qualtrics.SurveyEngine.getEmbeddedData(\n      \"Room 129 Mandatory Sessions Quota Count\"\n    )\n  });\n  slots.push({\n    room: 132,\n    occupants: Qualtrics.SurveyEngine.getEmbeddedData(\n      \"Room 132 Mandatory Sessions Quota Count\"\n    )\n  });\n  slots.push({\n    room: 135,\n    occupants: Qualtrics.SurveyEngine.getEmbeddedData(\n      \"Room 135 Mandatory Sessions Quota Count\"\n    )\n  });\n\n  // in case all other slots get filled up\n  var backupSlot = {\n    room: 136,\n    occupants: Qualtrics.SurveyEngine.getEmbeddedData(\n      \"Room 136 Mandatory Sessions Quota Count\"\n    )\n  };\n\n  var allSlotsAreFull = true;\n  var lowestOccupancySlot = slots[0];\n  for (var i = 1; i < slots.length; i++) {\n    if (slots[i].occupants < maximumOccupancy) {\n      allSlotsAreFull = false;\n    }\n    if (slots[i].occupants < lowestOccupancySlot.occupants) {\n      lowestOccupancySlot = slots[i];\n    }\n  }\n\n  var locationRoom = lowestOccupancySlot.room;\n\n  if (allSlotsAreFull) {\n    locationRoom = backupSlot.room;\n  }\n\n  Qualtrics.SurveyEngine.setEmbeddedData(\n    \"Mandatory Session Location\",\n    \"Baker Center, Room \" + locationRoom\n  );\n});\n\n\n//# sourceURL=webpack:///./src/per-question/undergraduate-mandatory-sessions.js?");

/***/ })

/******/ });