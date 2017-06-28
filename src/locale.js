export default function (lang) {
  if (lang) {
    window.localStorage.setItem('localization', lang)  // # update session localization
    switch (this.$options.localize.mode) {
      case 'stale':
        window.reload()  // # reload window with new locale
        break
      case 'hot':
        Vue.directive('localize').update()  // # update all directive bindings
        break
      default:
        if (this.$options.localize.debug) console.error('v-localize:\n  Mode could not be determined')
    }
  } else return this.$options.localize.locale
}
