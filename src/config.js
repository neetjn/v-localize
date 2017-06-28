export default function (options) {
  options.available.forEach(function (locale) {
    if (!options.localizations[locale]) console.warn('v-localize:\n  Localizations for locale ' + locale + ' not found.')
  });
  if (!window.localStorage.getItem('localization')) {
    options.locale = options.default // #
  } else {
    available = options.available.map(function(locale) {
      return locale.locale || locale // # reconstruct ignoring locale options
    });
    available.indexOf(window.localStorage.getItem('localization')) == -1 ? (options.locale = options.default) : (options.locale = window.localStorage.getItem('localization'));
  };
  window.localStorage.setItem('localization', options.locale) // # commit localization to local storage
  if (!options.fallback) options.fallback = 'N/A' // # set default fallback
  return options
}
