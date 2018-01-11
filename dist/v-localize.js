!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Localize",[],t):"object"==typeof exports?exports.Localize=t():e.Localize=t()}(this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var o={};return t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="dist/",t(t.s=0)}([function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(1),i=o(4);t.default={install:n.install,config:i.config},e.exports=t.default},function(e,t,o){"use strict";function n(e,t){e.directive("localize",i.directive),e.mixin({methods:{$locale:l.locale}})}Object.defineProperty(t,"__esModule",{value:!0}),t.install=n;var i=o(2),l=o(3)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.directive={unbind:function(e,t,o){var n=o.context.$root.$options.localize,i=n.linked.find(function(t){return t.el===e});"hot"===n.mode&&-1!==i&&n.linked.splice(n.linked.indexOf(i),1)},bind:function(e,t,o){var n=o.context.$root.$options.localize;"hot"!==n.mode||n.linked.find(function(t){return t.el===e})||n.linked.push({el:e,binding:t,vm:o});try{var i=n.localizations[t.value.t||n.locale];if(t.value.i.match(n.$constants.regex.item).forEach(function(e){if(void 0===(i=i[e]))throw new Error('Cannot read property for "'+e+'".')}),t.value.attr)e.setAttribute(t.value.attr,i);else{e.innerHTML=i;var l=n.available.find(function(e){return e.locale===n.locale});l&&(l.orientation&&e.setAttribute("dir",l.orientation),l.font&&(l.font.family&&(e.style.fontFamily=l.font.family),l.font.size&&(e.style.fontSize=l.font.size)))}}catch(o){n.$logger.warn('Could not find localization for "'+t.value.i+'" in '+(t.value.t||n.locale)+" language"),n.$logger.error(o),t.value.attr?e.setAttribute(t.value.attr,n.fallback):e.innerHTML=n.fallback}}}},function(e,t,o){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.$root.$options._base,o=this.$root.$options.localize;if(!e)return o.locale;if(e.l)if(o.available.find(function(t){return t.locale||t===e.l}))switch(o.locale=e.l,o.mode){case"stale":window.localStorage.setItem("localization",e.l),o.$logger.log("Local storage updated, waiting for reload.");break;case"reload":window.localStorage.setItem("localization",e.l),window.location.reload();break;case"hot":window.localStorage.setItem("localization",e.l),o.linked.forEach(function(e){t.directive("localize").bind(e.el,e.binding,e.vm)}),document.querySelector("html").setAttribute("lang",e.l);break;default:o.$logger.error("Mode could not be determined")}else o.$logger.error('Locale "'+e.lang+'" not defined in configuration.');else if(e.i){var n=o.localizations[e.t||o.locale];return e.i.match(o.$constants.regex.item).forEach(function(e){if(void 0===(n=n[e]))throw new Error('Cannot read property for "'+e+'".')}),n}}Object.defineProperty(t,"__esModule",{value:!0}),t.locale=n},function(e,t,o){"use strict";function n(e){var t=Object.assign({},e);if(t.$constants=i.constants,void 0===t.debug&&(t.debug=!1),t.$logger=new l.Logger(t.debug),void 0!==t.mode&&-1!==["hot","stale"].indexOf(t.mode)||(t.mode="stale"),"hot"===t.mode&&(t.linked=[]),t.available.forEach(function(e){e=e.locale||e,t.localizations[e]||(t.$logger,console.warn("v-localize:\n  Localizations for locale "+e+" not found."))}),window.localStorage.getItem("localization")){-1===t.available.map(function(e){return e.locale||e}).indexOf(window.localStorage.getItem("localization"))?t.locale=t.default:t.locale=window.localStorage.getItem("localization")}else t.locale=t.default;return window.localStorage.setItem("localization",t.locale),document.querySelector("html").setAttribute("lang",t.locale),t.fallback||(t.fallback="N/A"),t}Object.defineProperty(t,"__esModule",{value:!0}),t.config=n;var i=o(5),l=o(7)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.constants=void 0;var n=o(6);t.constants={version:n.version,regex:{item:/([a-zA-Z$]{1,}).*?/g}}},function(e,t){e.exports={name:"v-localize",version:"1.1.6",description:"Simple localization plugin for the amazing Vue.js.",main:"dist/v-localize.js",directories:{example:"example"},scripts:{build:"node_modules/.bin/cross-env NODE_ENV=production node_modules/.bin/webpack --config build/webpack.conf.js","build:dev":"node_modules/.bin/webpack --config build/webpack.conf.js",lint:"node_modules/.bin/eslint src/**.js","test:unit":"node_modules/.bin/karma start test/karma.conf.js",test:"npm run lint && npm run test:unit"},repository:{type:"git",url:"git+https://github.com/neetjn/v-localize.git"},keywords:["vue","vue.js","localize","javascript","i18n","internationalization"],author:"John Nolette",license:"MIT",bugs:{url:"https://github.com/neetjn/v-localize/issues"},homepage:"https://neetjn.github.io/v-localize/",devDependencies:{"babel-core":"^6.26.0","babel-eslint":"^7.2.3","babel-loader":"^7.1.2","babel-plugin-add-module-exports":"^0.2.1","babel-preset-env":"^1.6.1","babel-preset-flow-vue":"^1.0.0","babel-register":"^6.22.0","cross-env":"^5.0.1",electron:"^1.7.9",eslint:"^3.14.1","eslint-loader":"^1.6.1","eslint-plugin-flowtype":"^2.30.0","eslint-plugin-vue-libs":"^1.2.0","flow-bin":"^0.38.0",jasmine:"2.5.2",karma:"^1.7.1","karma-electron":"^5.2.1","karma-jasmine":"^1.1.0",vue:"^2.5.0",webpack:"^3.8.1"}}},function(e,t,o){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}();t.Logger=function(){function e(t){n(this,e),this.debugging=t,this.logs=[],Object.defineProperty(this,"time",{get:function(){return(new Date).getTime()}})}return i(e,[{key:"_format",value:function(e,t){return"["+new Date(t).toString()+']: (v-localize) "'+e+'"'}},{key:"$get",value:function(e){return this.logs.filter(function(t){return!e||t.type===e})}},{key:"log",value:function(e){var t=this.time;this.debugging&&console.log(this._format(e,t)),this.logs.push({type:"general",message:e,timestamp:t})}},{key:"warn",value:function(e){var t=this.time;this.debugging&&console.warn(this._format(e,t)),this.logs.push({type:"warning",message:e,timestamp:t})}},{key:"error",value:function(e){var t=this.time;this.debugging&&console.error(this._format(e,t)),this.logs.push({type:"critical",message:e,timestamp:t})}}]),e}()}])});