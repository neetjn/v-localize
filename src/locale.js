/**
 * v-localize $locale(args*) mixin
 * @param {string} lang - Language to change to.
 */
export default function (lang) {
  const localize = this.$root.$options.localize
  if (lang) {
    if (localize.available.find((e) => e.locale || e === lang)) {
      localize.locale = lang  // # update our locale
      switch (localize.mode) {
        case 'stale':
          window.localStorage.setItem('localization', lang)  // # update session localization
          if (localize.debug) {
            console.info('v-localize:\n  Local storage updated, waiting for reload.')
          }
          break
        case 'reload':
          window.localStorage.setItem('localization', lang)  // # update session localization
          window.location.reload()  // # reload window with new locale
          break
        case 'hot':
          window.localStorage.setItem('localization', lang)  // # update session localization
          localize.linked.forEach(function (e) {
            Vue.directive('localize').bind(e.el, e.binding, e.vm)  // # update all directive bindings
          })
          document.querySelector('html').setAttribute('lang', lang)  // # change document lang
          break
        default:
          if (localize.debug) {
            console.error('v-localize:\n  Mode could not be determined')
          }
      }
    } else if (localize.debug) {
      console.error('v-localize:\n  Locale "' + lang + '" not defined in configuration')
    }
  } else {
    return localize.locale
  }
}
