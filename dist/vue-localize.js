/*!
 * VueLocalize plugin version 0.0.1
 * https://aboutjn.xyz/#/projects/vue-localize
 *
 * Includes cookiesjs 1.4.2
 * https://github.com/franciscop/cookies.js
 *
 * Copyright John Nolette
 * Released under the MIT license
 * https://github.com/neetVeritas/vue-localize/blob/master/LICENSE
 */

 var cookies = function (data, opt) {
   function defaults (obj, defs) {
     obj = obj || {};
     for (var key in defs) {
       if (obj[key] === undefined) {
         obj[key] = defs[key];
       }
     }
     return obj;
   }

   defaults(cookies, {
     expires: 365 * 24 * 3600,
     path: '/',
     secure: window.location.protocol === 'https:',

     // Advanced
     nulltoremove: true,
     autojson: true,
     autoencode: true,
     encode: function (val) {
       return encodeURIComponent(val);
     },
     decode: function (val) {
       return decodeURIComponent(val);
     },
     error: function (error, data, opt) {
       throw new Error(error);
     },
     fallback: false
   });

   opt = defaults(opt, cookies);

   function expires (time) {
     var expires = time;
     if (!(expires instanceof Date)) {
       expires = new Date();
       expires.setTime(expires.getTime() + (time * 1000));
     }
     return expires.toUTCString();
   }

   if (typeof data === 'string') {
     var value = document.cookie.split(/;\s*/)
       .map(opt.autoencode ? opt.decode : function (d) { return d; })
       .map(function (part) { return part.split('='); })
       .reduce(function (parts, part) {
         parts[part[0]] = part.splice(1).join('=');
         return parts;
       }, {})[data];
     if (!opt.autojson) return value;
     var real;
     try {
       real = JSON.parse(value);
     } catch (e) {
       real = value;
     }
     if (typeof real === 'undefined' && opt.fallback) real = opt.fallback(data, opt);
     return real;
   }

   // Set each of the cookies
   for (var key in data) {
     var val = data[key];
     var expired = typeof val === 'undefined' || (opt.nulltoremove && val === null);
     var str = opt.autojson ? JSON.stringify(val) : val;
     var encoded = opt.autoencode ? opt.encode(str) : str;
     if (expired) encoded = '';
     var res = opt.encode(key) + '=' + encoded +
       (opt.expires ? (';expires=' + expires(expired ? -10000 : opt.expires)) : '') +
       ';path=' + opt.path +
       (opt.domain ? (';domain=' + opt.domain) : '') +
       (opt.secure ? ';secure' : '');
     if (opt.test) opt.test(res);
     document.cookie = res;

     var read = (cookies(opt.encode(key)) || '');
     if (val && !expired && opt.expires > 0 &&
         JSON.stringify(read) !== JSON.stringify(val)) {
       if (navigator.cookieEnabled) {
         if (opt.fallback) {
           opt.fallback(data, opt);
         } else {
           opt.error('Cookie too large at ' + val.length + ' characters');
         }
       } else {
         opt.error('Cookies not enabled');
       }
     }
   }
   return cookies;
 };

var VueLocalize = {
	install(Vue, options) {
  	Vue.prototype.$lang = cookies('localization') || cookies({localization: options.lang_default}) && options.lang_default;
  	Vue.prototype.$localizations = options.localizations;
    Vue.prototype.$locale_default = options.locale_default || 'N/A';
    Vue.prototype.$setLang = function(lang) {
    	cookies({localization: lang}); // # update session localization
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
