/**
 * v-localize $locale(args*) mixin
 * @param {string} lang - Language to change to.
 */
export function locale (opts = null) {
  const vue = this.$root.$options._base
  const localize = this.$root.$options.localize
  if (opts) {
    if (opts.l) {
      if (localize.available.find((e) => e.locale || e === opts.l)) {
        localize.locale = opts.l  // # update our locale
        switch (localize.mode) {
          case 'stale':
            window.localStorage.setItem('localization', opts.l)  // # update session localization
            localize.$logger.log('Local storage updated, waiting for reload.')
            break
          case 'reload':
            window.localStorage.setItem('localization', opts.l)  // # update session localization
            window.location.reload()  // # reload window with new locale
            break
          case 'hot':
            window.localStorage.setItem('localization', opts.l)  // # update session localization
            localize.linked.forEach(function (e) {
              vue.directive('localize').bind(e.el, e.binding, e.vm)  // # update all directive bindings
            })
            document.querySelector('html').setAttribute('lang', opts.l)  // # change document lang
            break
          default:
            localize.$logger.error('Mode could not be determined')
        }
      } else {
        localize.$logger.error(`Locale "${opts.lang}" not defined in configuration.`)
      }
    } else if (opts.i) {
      var localization = localize.localizations[opts.t || localize.locale]
      opts.i.match(localize.$constants.regex.item).forEach(function (key) {
        localization = localization[key]
        if (localization === undefined) {
          throw new Error(`Cannot read property for "${key}".`)
        }
      })
      return localization
    }
  } else {
    return localize.locale
  }
}
