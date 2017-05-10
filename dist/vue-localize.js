/*!
 * VueLocalize plugin version 0.0.2
 * https://aboutjn.xyz/#/projects/vue-localize
 *
 * Copyright John Nolette
 * Released under the MIT license
 * https://github.com/neetVeritas/vue-localize/blob/master/LICENSE
 */

 var VueLocalize = {
 	install(Vue, options) {
   	window.localStorage.getItem('localization') === null ? (Vue.prototype.$lang = options.lang_default) & window.localStorage.setItem('localization', options.lang_default) : (Vue.prototype.$lang = window.localStorage.getItem('localization'));
   	Vue.prototype.$localizations = options.localizations;
     Vue.prototype.$locale_default = options.locale_default || 'N/A';
     Vue.prototype.$setLang = function(lang) {
     	 window.localStorage.setItem('localization', lang); // # update session localization
       window.location.reload();  // # reload app with new localization
     };
     Vue.directive('localize', function(el, binding, vm) {
     	try {
       	var regex = /([a-zA-Z$]{1,}).*?/g;
         var localization = vm.context.$localizations[vm.context.$lang];
         binding.value.match(regex).forEach(function(key) {
           localization = localization[key];
         });
         el.innerHTML = localization;
       } catch(e) {
       	console.error(`VueLocalization: Could not find localization for "${binding.value}" in "${vm.context.$lang}" language.`);
         console.error(e);
         el.innerText = vm.context.$locale_default;
       }
     });
   }
 };

if ((typeof process !== 'undefined') && (process.release.name === 'node')) {
    module.exports = VueLocalize;  // # export for node use
};
