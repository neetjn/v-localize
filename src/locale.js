export default function (lang) {
  const localize = this.$root.$options.localize
  if (lang) {
    if (localize.available.find((e) => e.locale || e === lang)) {
      localize.locale = lang  // # update our locale
      window.localStorage.setItem('localization', lang)  // # update session localization
      switch (localize.mode) {
        case 'stale':
          window.location.reload()  // # reload window with new locale
          break
        case 'hot':
          localize.linked.forEach(function (e) {
            Vue.directive('localize').bind(e.el, e.binding, e.vm)  // # update all directive bindings
          })
          break
        default:
          if (localize.debug) console.error('v-localize:\n  Mode could not be determined')
      }
    } else if (localize.debug) console.error('v-localize:\n  Locale "' + lang + '" not defined in configuration')
  } else return localize.locale
}
