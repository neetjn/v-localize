(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Localize", [], factory);
	else if(typeof exports === 'object')
		exports["Localize"] = factory();
	else
		root["Localize"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (options) {
  options.regex = /([a-zA-Z$]{1,}).*?/g;
  if (options.debug === undefined) options.debug = false;
  if (options.mode === undefined || ['hot', 'stale'].indexOf(options.mode) === -1) options.mode = 'stale';
  if (options.mode === 'hot') options.linked = [];
  options.available.forEach(function (locale) {
    locale = locale.locale || locale;
    if (!options.localizations[locale] && options.debug) {
      console.warn('v-localize:\n  Localizations for locale ' + locale + ' not found.');
    }
  });
  if (!window.localStorage.getItem('localization')) options.locale = options.default;else {
      var available = options.available.map(function (locale) {
        return locale.locale || locale;
      });
      available.indexOf(window.localStorage.getItem('localization')) === -1 ? options.locale = options.default : options.locale = window.localStorage.getItem('localization');
    };
  window.localStorage.setItem('localization', options.locale);
  if (!options.fallback) options.fallback = 'N/A';
  return options;
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__locale_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__localize_js__ = __webpack_require__(4);



/* harmony default export */ __webpack_exports__["a"] = (function (Vue, options) {
  Vue.prototype.$locale = __WEBPACK_IMPORTED_MODULE_0__locale_js__["a" /* default */];
  Vue.directive('localize', __WEBPACK_IMPORTED_MODULE_1__localize_js__["a" /* default */]);
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_js__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return __WEBPACK_IMPORTED_MODULE_0__install_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return __WEBPACK_IMPORTED_MODULE_1__config_js__["a"]; });





/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (lang) {
  var localize = this.$options.localize;
  if (lang) {
    if (localize.available.find(function (e) {
      return e.locale || e == lang;
    })) {
      localize.locale = lang;
      window.localStorage.setItem('localization', lang);
      switch (localize.mode) {
        case 'stale':
          window.reload();
          break;
        case 'hot':
          localize.linked.forEach(function (e) {
            Vue.directive('localize').bind(e.el, e.binding, e.vm);
          });
          break;
        default:
          if (localize.debug) console.error('v-localize:\n  Mode could not be determined');
      }
    } else if (localize.debug) console.error('v-localize:\n  Locale "' + lang + '" not defined in configuration');
  } else return localize.locale;
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  bind: function bind(el, binding, vm) {
    var localize = vm.context.$root.$options.localize;
    if (localize.mode === 'hot' && !localize.linked.find(function (e) {
      return e.el === el;
    })) {
      localize.linked.push({
        el: el, binding: binding, vm: vm
      });
    }
    try {
      var localization = localize.localizations[binding.value.locale || localize.locale];
      binding.value.item.match(localize.regex).forEach(function (key) {
        localization = localization[key];
        if (localization === undefined && localize.debug) throw new Error('Cannot read property for ' + key + '.');
      });
      if (!binding.value.attr) {
        el.innerHTML = localization;
        var options = localize.available.find(function (loc) {
          return loc.locale == localize.locale;
        });
        if (options) {
          if (options.orientation) el.setAttribute('dir', options.orientation);
          if (options.font) {
            if (options.font.family) el.style.fontFamily = options.font.family;
            if (options.font.size) el.style.fontSize = options.font.size;
          };
        };
      } else el.setAttribute(binding.value.attr, localization);
    } catch (e) {
      if (localize.debug) {
        console.error('v-localize:\n  Could not find localization for ' + binding.value.item + ' in ' + localize.locale + ' language.');
        console.error(e);
      };
      !binding.value.attr ? el.innerHTML = localize.fallback : el.setAttribute(binding.value.attr, localize.fallback);
    }
  }
});

/***/ })
/******/ ]);
});