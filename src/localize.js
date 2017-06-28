export default function (el, binding, vm) {
  const localize = vm.context.$root.$options.localize
  try {
    var localization = localize.localizations[binding.value.locale || localize.locale]
    binding.value.item.match(localize.regex).forEach(function (key) {
      localization = localization[key]
      if (localization === undefined && localize.debug) throw new Error('Cannot read property for ' + key + '.')
    })
    if (!binding.value.attr) {
      el.innerHTML = localization
      const options = localize.available.find((loc) => {
        return loc.locale == localize.locale  // # find options for locale if exists
      })
      if (options) {
        if (options.orientation) el.setAttribute('dir', options.orientation)  // # change element display orientation
        if (options.font) {
          if (options.font.family) el.style.fontFamily = options.font.family  // # https://www.w3schools.com/jsref/prop_style_fontfamily.asp
          if (options.font.size) el.style.fontSize = options.font.size  // # https://www.w3schools.com/jsref/prop_style_fontsize.asp
        };
      };
    } else el.setAttribute(binding.value.attr, localization)  // # localize attribute
  } catch (e) {
    if (localize.debug) {
      console.error('v-localize:\n  Could not find localization for ' + binding.value.item + ' in ' + localize.locale + ' language.');
      console.error(e)
    };
    (!binding.value.attr) ? (el.innerHTML = localize.fallback) : (el.setAttribute(binding.value.attr, localize.fallback))
  }
}
