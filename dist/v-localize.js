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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var config, install;

({install} = __webpack_require__(1));

({config} = __webpack_require__(4));

module.exports = {
  install: install,
  config: config
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var directive, locale;

({directive} = __webpack_require__(2));

({locale} = __webpack_require__(3));

module.exports = {
  install: function(Vue, options) {
    Vue.directive('localize', directive);
    return Vue.mixin({ // define global mixin
      methods: {
        $locale: locale
      }
    });
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
* v-localize directive
* vue.js reference: https://vuejs.org/v2/api/#Vue-directive
 */
module.exports = {
  directive: {
    /*
     * @param {element} el - The element the directive is bound to.
     * @param {object} binding - Vue binding properties.
     * @param {vnode} vnode - The virtual node produced by Vue’s compiler.
     */
    unbind: function(el, binding, vnode) {
      var localize;
      localize = vnode.context.$root.$options.localize;
      // remove node from store
      return localize.nodes.splice(localize.nodes.indexOf(localize.nodes.find(function(e) {
        return e.el === el;
      })), 1);
    },
    /*
     * @param {element} el - The element the directive is bound to.
     * @param {object} binding - Vue binding properties.
     * @param {vnode} vnode - The virtual node produced by Vue’s compiler.
     */
    bind: function(el, binding, vm) {
      var branch, branches, e, fallback, i, localization, localize, options;
      localize = vm.context.$root.$options.localize;
      if (!localize.nodes.find(function(e) {
        return e.el === el;
      })) {
        // store localized node for updates
        localize.nodes.push({
          el: el,
          binding: binding,
          vm: vm
        });
      }
      try {
        // get localization tree
        // coffeelint: disable=max_line_length
        localization = localize.localizations[binding.value.t || localize.locale];
        // coffeelint: enable=max_line_length
        branches = binding.value.i.match(localize.$constants.regex.item);
// not using forEach for hard escape
        for (i in branches) {
          branch = branches[i];
          localization = localization[branch];
          if (localization === void 0) {
            throw new Error(`Cannot read property for "${branch}".`);
          }
        }
        if (binding.value.attr) {
          return el.setAttribute(binding.value.attr, localization); // localize attribute
        } else {
          el.innerHTML = localization;
          // find options for locale if exists
          options = localize.available.find(function(loc) {
            return loc.locale === localize.locale;
          });
          if (options) {
            if (options.orientation) {
              // change element display orientation
              el.setAttribute('dir', options.orientation);
            }
            if (options.font) {
              if (options.font.family) {
                // https://www.w3schools.com/jsref/prop_style_fontfamily.asp
                el.style.fontFamily = options.font.family;
              }
              if (options.font.size) {
                // https://www.w3schools.com/jsref/prop_style_fontsize.asp
                return el.style.fontSize = options.font.size;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        // coffeelint: disable=max_line_length
        localize.$logger.warn(`Could not find localization for "${binding.value.i}" in ${binding.value.t || localize.locale}`);
        localize.$logger.error(e);
        fallback = localize.fallbackContent ? el.textContent || el.innerHTML : localize.fallback;
        // coffeelint: enable=max_line_length
        if (binding.value.attr) {
          return el.setAttribute(binding.value.attr, fallback);
        } else {
          return el.innerHTML = fallback;
        }
      }
    }
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
  /*
   * v-localize $locale(args*) mixin
   * @param {string} lang - Language to change to.
   */
  locale: function(opts = null) {
    var branch, branches, i, localization, localize, vue;
    vue = this.$root.$options._base;
    localize = this.$root.$options.localize;
    if (opts) {
      if (opts.l) {
        if (localize.available.find(function(e) {
          return e.locale || e === opts.l;
        })) {
          localize.locale = opts.l; // update our locale
          if (localize.webStore) {
            // update session localization
            window.localStorage.setItem('locale', opts.l);
          }
          localize.nodes.forEach(function(e) {
            // update all directive bindings
            return vue.directive('localize').bind(e.el, e.binding, e.vm);
          });
          if (typeof document !== 'undefined') {
            // change document lang
            return document.querySelector('html').setAttribute('lang', opts.l);
          }
        } else {
          return localize.$logger.error(`Locale "${opts.lang}" not defined in configuration.`);
        }
      } else if (opts.i) {
        // get localization tree
        localization = localize.localizations[opts.t || localize.locale];
        branches = opts.i.match(localize.$constants.regex.item);
// not using forEach for hard escape
        for (i in branches) {
          branch = branches[i];
          localization = localization[branch];
          if (localization === void 0) {
            throw new Error(`Cannot read property for "${branch}".`);
          }
        }
        return localization;
      }
    } else {
      return localize.locale;
    }
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Logger, constants;

({constants} = __webpack_require__(5));

({Logger} = __webpack_require__(7));

module.exports = {
  /*
   * v-localize configuration builder
   * @param {object} options - v-localize options.
   */
  config: function(options) {
    var available, localize, webCached;
    localize = Object.assign({}, options);
    localize.$constants = constants;
    localize.debug = localize.debug || false;
    localize.$logger = new Logger(localize.debug);
    localize.nodes = [];
    // integrity checks
    available = localize.available.map(function(locale) {
      return locale.locale || locale;
    });
    // for locales with localize
    available.forEach(function(locale) {
      if (!localize.localizations[locale]) {
        throw Error(`Localizations for locale "${locale}" not found.`);
      }
    });
    localize.webStore = localize.webStore && typeof window !== 'undefined';
    if (localize.webStore) {
      webCached = window.localStorage.getItem('locale');
      if (webCached && available.find(function(locale) {
        return locale === webCached;
      })) {
        localize.locale = webCached;
      } else {
        // default to default locale
        localize.locale = localize.default;
        // commit localization to local storage
        window.localStorage.setItem('locale', localize.locale);
      }
    } else {
      // default to default locale
      localize.locale = localize.default;
    }
    if (typeof document !== 'undefined') {
      // change document lang
      document.querySelector('html').setAttribute('lang', localize.locale);
    }
    localize.defaultFallback = localize.defaultFallback || false;
    localize.fallback = localize.fallback || 'N/A';
    return localize;
  }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var version;

({version} = __webpack_require__(6));

module.exports = {
  constants: {
    version: version,
    regex: {
      // regex for searching for locale
      item: /([a-zA-Z$]{1,}).*?/g
    }
  }
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"name":"v-localize","version":"1.2.1","description":"Simple localization plugin for the amazing Vue.js.","main":"dist/v-localize.js","directories":{"example":"example"},"scripts":{"bundle":"node_modules/.bin/webpack --config webpack.config.js","lint":"node_modules/.bin/coffeelint -f coffee-lint.json src/**.coffee","test":"node_modules/.bin/karma start test/karma.conf.js","build":"npm run lint && npm run bundle && npm run test"},"repository":{"type":"git","url":"git+https://github.com/neetjn/v-localize.git"},"keywords":["vue","vue.js","localize","javascript","i18n","internationalization","coffeescript"],"author":"John Nolette","license":"MIT","bugs":{"url":"https://github.com/neetjn/v-localize/issues"},"homepage":"https://neetjn.github.io/v-localize/","dependencies":{},"devDependencies":{"coffee-loader":"^0.9.0","coffeelint":"^2.1.0","coffeescript":"^2.4.1","hoek":"^5.0.3","jest":"^24.7.1","jest-dom":"^3.1.3","vue":"^2.6.10","webpack":"^3.8.1"},"jest":{"coverageDirectory":"./coverage/","collectCoverage":true,"verbose":true}}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var Logger;

Logger = class Logger {
  /*
   * Logging interface for v-localize
   * @param {bool} debugging - Debug to console.
   */
  constructor(debugging) {
    this.debugging = debugging;
    this.logs = [];
    Object.defineProperty(this, 'time', {
      get: function() {
        return (new Date).getTime();
      }
    });
  }

  /*
   * Format log for logstore
   * @param {string} message - message to log.
   * @param {int} timestamp - timestamp for log.
   */
  _format(message, timestamp) {
    return `[${new Date(timestamp)}]: (v-localize) "${message}"`;
  }

  /*
   * Fetch logs, allows for filtering by type.
   * @param {string} type - Log type to filter by.
   * @returns {Array}
   */
  $get(type) {
    return this.logs.filter(log(function() {
      return type != null ? type : log.type === {
        type: true
      };
    }));
  }

  /*
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  log(message) {
    var timestamp;
    timestamp = this.time;
    if (this.debugging) {
      console.log(this._format(message, timestamp));
    }
    return this.logs.push({
      type: 'log',
      message: timestamp
    });
  }

  /*
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  warn(message) {
    var timestamp;
    timestamp = this.time;
    if (this.debugging) {
      console.warn(this._format(message, timestamp));
    }
    return this.logs.push({
      type: 'warning',
      message: timestamp
    });
  }

  /*
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  error(message) {
    var timestamp;
    timestamp = this.time;
    if (this.debugging) {
      console.error(this._format(message, timestamp));
    }
    return this.logs.push({
      type: 'critical',
      message: timestamp
    });
  }

};

module.exports = {
  Logger: Logger
};


/***/ })
/******/ ]);
});