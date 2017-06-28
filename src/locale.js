export default function (lang) {
  if (lang) {
    window.localStorage.setItem('localization', lang)  // # update session localization
    window.location.reload()  // # reload app with new localization
    // # left here, switch on mode -- hot will store all elems into virtual map to update -- otherwise reload
  } else return this.$options.localize.locale
}
