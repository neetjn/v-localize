export default function (el, binding, vm) {
  let localize = vm.context.$root.$options.localize
  if (!binding.value) el.innerHTML = localize.locale
  else {
    try {
      var regex = /([a-zA-Z$]{1,}).*?/g;
      var localization = localize.localizations[binding.value.locale || localize.locale];
      binding.value.item.match(regex).forEach(function (key) {
        localization = localization[key];
        if (localization === undefined && localize.debug) throw new Error('Cannot read property for ' + key + '.');
      });
      (!binding.value.attr) ? (el.innerHTML = localization) : (el.setAttribute(binding.value.attr, localization));
      if (!binding.value.attr) {
        el.innerHTML = localization;
        ops = localize.available.find((loc) => {
          return loc.locale == localize.locale;
        });
        if (ops) {
          if (ops.orientation) el.setAttribute('dir', ops.orientation); // # change element display orientation
          if (ops.font) {
            if (ops.font.family) el.style.fontFamily = ops.font.family; // # https://www.w3schools.com/jsref/prop_style_fontfamily.asp
            if (ops.font.size) el.style.fontSize = ops.font.size; // # https://www.w3schools.com/jsref/prop_style_fontsize.asp
          };
        };
      }
    } catch (e) {
      if (localize.debug) {
        console.error('v-localize:\n  Could not find localization for ' + binding.value.item + ' in ' + localize.locale + ' language.');
        console.error(e);
      };
      (!binding.value.attr) ? (el.innerHTML = localize.fallback) : (el.setAttribute(binding.value.attr, localize.fallback));
    }
  }
}
