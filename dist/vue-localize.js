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
     window.localStorage.setItem('localization', lang);  // # update session localization
     window.location.reload();  // # reload app with new localization
   };
   Vue.directive('localize', function(el, binding, vm) {
     localize = vm.context.$root.$options.localize;
     try {
       var regex = /([a-zA-Z$]{1,}).*?/g;
       var localization = localize.localizations[binding.value.locale || localize.locale];
       binding.value.item.match(regex).forEach(function(key) {
         localization = localization[key];
         if (localization === undefined) throw new Error('Cannot read property for ' + key + '.');
       });
       (!binding.value.attr) ? (el.innerHTML = localization) : (el.setAttribute(binding.value.attr, localization));
     } catch(e) {
       console.error('v-localize:\n\tCould not find localization for ' + binding.value.item + ' in ' + localize.locale + ' language.');
       console.error(e);
     }
   });
 },
 config: function(ops) {
   ops.available.forEach(function(locale) {
     if (!ops.localizations[locale]) console.warn('v-localize:\n\tLocalizations for locale ' + locale + ' not found.');
   });
   window.localStorage.getItem('localization') === null ? (ops.locale = ops.default) && window.localStorage.setItem('localization', ops.default) : (ops.locale = window.localStorage.getItem('localization'));
   if (!ops.not_found) ops.not_found = 'N/A';
   return ops;
 }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Localize;
};
