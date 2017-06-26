/*!
 * V-Localize plugin
 * https://aboutjn.xyz/#/projects/vue-localize
 *
 * Copyright John Nolette
 * Released under the MIT license
 * https://github.com/neetVeritas/vue-localize/blob/master/LICENSE
 */

var Localize = {
 install: function(Vue, options) {
   Vue.prototype.$locale = function(lang) {
     if (lang) {
       window.localStorage.setItem('localization', lang);  // # update session localization
       window.location.reload();  // # reload app with new localization
     } else { return this.$options.localize.locale; }
   };
   Vue.directive('localize', function(el, binding, vm) {
     localize = vm.context.$root.$options.localize;
     if(!binding.value) { el.innerHTML = localize.locale; }
     else {
      try {
        var regex = /([a-zA-Z$]{1,}).*?/g;
        var localization = localize.localizations[binding.value.locale || localize.locale];
        binding.value.item.match(regex).forEach(function(key) {
          localization = localization[key];
          if (localization === undefined && localize.debug) throw new Error('Cannot read property for ' + key + '.');
        });
        (!binding.value.attr) ? (el.innerHTML = localization) : (el.setAttribute(binding.value.attr, localization));
      } catch(e) {
        if (localize.debug) {
          console.error('v-localize:\n  Could not find localization for ' + binding.value.item + ' in ' + localize.locale + ' language.');
          console.error(e);
        };
        (!binding.value.attr) ? (el.innerHTML = localize.fallback) : (el.setAttribute(binding.value.attr, localize.fallback));
      }
     }
   });
 },
 config: function(ops) {
   ops.available.forEach(function(locale) {
     if (!ops.localizations[locale]) console.warn('v-localize:\n  Localizations for locale ' + locale + ' not found.');
   });
   if (!window.localStorage.getItem('localization')) {
     ops.locale = ops.default;
   } else {
   	 available = ops.available.map(function(locale) {
       return locale.locale || locale;
     });
     if (available.indexOf(window.localStorage.getItem('localization')) == -1) {
       ops.locale = ops.default;
     } else {
       ops.locale = window.localStorage.getItem('localization');
     };
   };
   window.localStorage.setItem('localization', ops.locale);
   let computed = ops.available.find(function(e) {
     return e.locale == ops.locale && e.orientation
   });
   if (computed) {
   	 if (computed.orientation) document.querySelector('body').setAttribute('dir', computed.orientation);
   }; // locale options
   if (!ops.fallback) ops.fallback = 'N/A';
   return ops;
 }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Localize;
};
