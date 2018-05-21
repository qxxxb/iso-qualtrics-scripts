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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/per-question/latecomer-paperwork-check-ins.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/per-question/latecomer-paperwork-check-ins.js":
/*!***********************************************************!*\
  !*** ./src/per-question/latecomer-paperwork-check-ins.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var slot_registration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! slot-registration.js */ \"./src/slot-registration.js\");\n\n\nQualtrics.SurveyEngine.addOnload(() => {\n  var registration = new slot_registration_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    slotRanges: [\n      {\n        time: {\n          start: new Date(\"8/22/2018 3:00 PM\"),\n          end: new Date(\"8/22/2018 4:00 PM\")\n        }\n      },\n    ],\n    slotLength: 15,\n    slotCapacity: 10\n  });\n\n  var amountRegistered822 = Qualtrics.SurveyEngine.getEmbeddedData(\n    \"8/22 Paperwork Check-ins Quota Count\"\n  );\n  registration.setOccupancy(new Date(\"8/22/2018\"), amountRegistered822);\n\n  var arrivalDate = Qualtrics.SurveyEngine.getEmbeddedData(\"Arrival Date\");\n  if (arrivalDate != \"On Time\") {\n    var arrivalDate = new Date(arrivalDate);\n  }\n  registration.setArrivalDate(arrivalDate);\n\n  var slot = registration.register();\n\n  var slotTime = slot.time.toLocaleTimeString(\"en-US\", {\n    timeZone: \"America/New_York\",\n    hour: \"2-digit\",\n    minute: \"2-digit\"\n  });\n  var slotDate = slot.time.toLocaleString(\"en-US\", {\n    timeZone: \"America/New_York\",\n    weekday: \"long\",\n    month: \"numeric\",\n    day: \"numeric\"\n  });\n  Qualtrics.SurveyEngine.setEmbeddedData(\"Paperwork Check-in Time\", slotTime);\n  Qualtrics.SurveyEngine.setEmbeddedData(\"Paperwork Check-in Date\", slotDate);\n});\n\n\n//# sourceURL=webpack:///./src/per-question/latecomer-paperwork-check-ins.js?");

/***/ }),

/***/ "./src/slot-registration.js":
/*!**********************************!*\
  !*** ./src/slot-registration.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SlotRegistration; });\nclass SlotRegistration {\n  constructor(config) {\n    // TODO: config validation\n\n    this.slotLength = config.slotLength;\n\n    this.slots = [];\n    this.occupancies = [];\n    this.arrivalDate = \"On Time\";\n\n    this.calculateSlots(config);\n    this.setDefaultOccupancies();\n  }\n\n  // create array of time slots based on time ranges\n  calculateSlots(config) {\n    this.slots = [];\n    for (var i = 0; i < config.slotRanges.length; i++) {\n      var startTime = config.slotRanges[i].time.start;\n      var endTime = config.slotRanges[i].time.end;\n\n      var slotTimeStart = startTime;\n\n      while (slotTimeStart < endTime) {\n        // push the slot\n        var slot = {\n          time: slotTimeStart\n        };\n        if (\"location\" in config.slotRanges[i]) {\n          slot.location = config.slotRanges[i].location;\n        }\n        if (\"slotCapacity\" in config.slotRanges[i]) {\n          slot.capacity = config.slotRanges[i].slotCapacity;\n        } else if (\"slotCapacity\" in config) {\n          slot.capacity = config.slotCapacity;\n        } else {\n          throw \"Missing capacity for slot\";\n        }\n        this.slots.push(slot);\n\n        // calculate the next slot\n        // 60000 milliseconds in a minute\n        slotTimeStart = new Date(\n          slotTimeStart.getTime() + this.slotLength * 60000\n        );\n      }\n    }\n  }\n\n  setSlots(slots) {\n    this.slots = slots;\n    this.setDefaultOccupancies();\n  }\n\n  getUniqueDatesInSlots() {\n    var dates = [];\n    for (var i = 0; i < this.slots.length; i++) {\n      if (\n        dates.length == 0 ||\n        ((dates, testDate) => {\n          for (var j = 0; j < dates.length; j++) {\n            if (testDate.toDateString() == dates[j].toDateString()) {\n              return false;\n            }\n          }\n          return true;\n        })(dates, this.slots[i].time)\n      ) {\n        dates.push(new Date(this.slots[i].time.toLocaleDateString()));\n      }\n    }\n    return dates;\n  }\n\n  setDefaultOccupancies() {\n    this.occupancies = [];\n    var uniqueDates = this.getUniqueDatesInSlots();\n    for (var i = 0; i < uniqueDates.length; i++) {\n      this.occupancies.push({ date: uniqueDates[i], count: 0 });\n    }\n  }\n\n  // set the number of people already registered into the slots of a day\n  setOccupancy(slotsDate, count) {\n    // because of `setDefaultOccupancies()`, which initializes all possible\n    // occupancies to 0, a previous entry must exist in order for it to be a\n    // valid occupancy\n    var previousEntryExists = false;\n    for (var i = 0; i < this.occupancies.length; i++) {\n      if (this.occupancies[i].date.toDateString() == slotsDate.toDateString()) {\n        this.occupancies[i].count = count;\n        return;\n      }\n    }\n    throw new RangeError(\"Date does not exist in time range\");\n  }\n\n  countOccupantsInDay(date) {\n    for (var i = 0; i < this.occupancies.length; i++) {\n      if (this.occupancies[i].date.toDateString() == date.toDateString()) {\n        return this.occupancies[i].count;\n      }\n    }\n    throw new RangeError(\"Date does not exist in time range\");\n  }\n\n  setArrivalDate(arrivalDate) {\n    this.arrivalDate = arrivalDate;\n  }\n\n  getMaxOccupantsInDay(date) {\n    var maxOccupants = 0;\n    var dayExistsInSlots = false;\n    for (var i = 0; i < this.slots.length; i++) {\n      if (this.slots[i].time.toDateString() == date.toDateString()) {\n        dayExistsInSlots = true;\n        maxOccupants += this.slots[i].capacity;\n      }\n    }\n    if (!dayExistsInSlots) {\n      throw new RangeError(\"Date does not exist in time range\");\n    }\n    return maxOccupants;\n  }\n\n  isDayFull(date) {\n    for (var i = 0; i < this.occupancies.length; i++) {\n      if (this.occupancies[i].date.toDateString() == date.toDateString()) {\n        try {\n          var maxOccupants = this.getMaxOccupantsInDay(date);\n        } catch (e) {\n          throw new RangeError(\n            \"Date in occupancies does not exist in time range\"\n          );\n        }\n        if (this.occupancies[i].count >= maxOccupants) {\n          return true;\n        }\n        return false;\n      }\n    }\n    throw new RangeError(\"Date does not exist in time range\");\n  }\n\n  getFirstAvailableSlot() {\n    for (var i = 0; i < this.occupancies.length; i++) {\n      // assume that they are only available the day after they arrive\n      if (this.occupancies[i].date <= this.arrivalDate) {\n        continue;\n      }\n      if (this.isDayFull(this.occupancies[i].date)) {\n        continue;\n      }\n      // now that we know the day is not full, we need to get the first\n      // available slot\n      var firstAvailableDay = this.occupancies[i].date;\n      var occupantsInDay = this.countOccupantsInDay(this.occupancies[i].date);\n      // the index in `this.slots` where the available day's slots begin\n      var sessionNumberOffset = null;\n      // the offset of the index of the correct slot in the slots of the\n      // available day\n      var slotIndexOffset = 0;\n      // the number of spaces still occupied after filling up each slot capacity\n      var remainder = occupantsInDay;\n      for (var i = 0; i < this.slots.length; i++) {\n        if (\n          this.slots[i].time.toDateString() == firstAvailableDay.toDateString()\n        ) {\n          if (sessionNumberOffset == null) {\n            sessionNumberOffset = i;\n          }\n          remainder = remainder - this.slots[i].capacity;\n          if (remainder < 0) {\n            break;\n          }\n          slotIndexOffset++;\n        }\n      }\n      var sessionNumber = slotIndexOffset + sessionNumberOffset;\n      var slot = this.slots[sessionNumber];\n      delete slot.capacity;\n      return slot;\n    }\n  }\n\n  register() {\n    return this.getFirstAvailableSlot();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/slot-registration.js?");

/***/ })

/******/ });