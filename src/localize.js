/**
 * v-localize directive
 */
export const directive = {

  /**
   * @param {element} el - The element the directive is bound to.
   * @param {object} binding - Vue binding properties.
   * @param {vnode} vnode - The virtual node produced by Vue’s compiler.
   */
  unbind: function (el, binding, vnode) {
    const localize = vnode.context.$root.$options.localize

    const check = localize.linked.find((e) => e.el === el)
    if (localize.mode === 'hot' && check !== -1) {
      localize.linked.splice(localize.linked.indexOf(check), 1)  // # remove from store
    }
  },

  /**
   * @param {element} el - The element the directive is bound to.
   * @param {object} binding - Vue binding properties.
   * @param {vnode} vnode - The virtual node produced by Vue’s compiler.
   */
  bind: function (el, binding, vm) {
    const localize = vm.context.$root.$options.localize

    if (localize.mode === 'hot' && !localize.linked.find((e) => e.el === el)) {
      localize.linked.push({
        el, binding, vm
      })  // # store localized properties for updates
    }
    try {
      var localization = localize.localizations[binding.value.t || localize.locale]
      binding.value.i.match(localize.$constants.regex.item).forEach(function (key) {
        localization = localization[key]
        if (localization === undefined) {
          throw new Error(`Cannot read property for "${key}".`)
        }
      })
      if (!binding.value.attr) {
        el.innerHTML = localization
        const options = localize.available.find(function (loc) {
          return loc.locale === localize.locale  // # find options for locale if exists
        })
        if (options) {
          if (options.orientation) {
            el.setAttribute('dir', options.orientation)  // # change element display orientation
          }
          if (options.font) {
            if (options.font.family) {
              el.style.fontFamily = options.font.family
            }  // # https://www.w3schools.com/jsref/prop_style_fontfamily.asp
            if (options.font.size) {
              el.style.fontSize = options.font.size
            }  // # https://www.w3schools.com/jsref/prop_style_fontsize.asp
          }
        }
      } else el.setAttribute(binding.value.attr, localization)  // # localize attribute
    } catch (e) {
      localize.$logger.warn(
        `Could not find localization for "${binding.value.i}" in ${binding.value.t || localize.locale} language`)
      localize.$logger.error(e)
      if (!binding.value.attr) {
        el.innerHTML = localize.fallback
      } else {
        el.setAttribute(binding.value.attr, localize.fallback)
      }
    }
  }

}
