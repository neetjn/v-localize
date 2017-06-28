export default function (options) {
  options.regex = /([a-zA-Z$]{1,}).*?/g  // # regex for searching for locale
  if (options.debug === undefined) options.debug = false
  if (options.mode === undefined || ('hot', 'stale').indexOf(options.mode) === -1) options.mode = 'hot'
  options.available.forEach(function (locale) {
    locale = locale.locale || locale  // # for locales with options
    if (!options.localizations[locale] && options.debug) {
      console.warn('v-localize:\n  Localizations for locale ' + locale + ' not found.')
    }
  })
  if (!window.localStorage.getItem('localization')) options.locale = options.default  // # default to default locale if session does not exist
  else {
    const available = options.available.map(function (locale) {
      return locale.locale || locale  // # reconstruct ignoring locale options
    })
    available.indexOf(window.localStorage.getItem('localization')) === -1 ? (options.locale = options.default) : (options.locale = window.localStorage.getItem('localization'));
  };
  window.localStorage.setItem('localization', options.locale)  // # commit localization to local storage
  if (!options.fallback) options.fallback = 'N/A'  // # set default fallback
  return options
}
