export default function (lang) {
  if (lang) {
    window.localStorage.setItem('localization', lang)  // # update session localization
    window.location.reload()  // # reload app with new localization
  } else { return this.$options.localize.locale; }
}
