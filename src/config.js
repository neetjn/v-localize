import { constants } from './constants'
import { Logger } from './logger'

/**
 * v-localize configuration builder
 * @param {object} options - v-localize options.
 */
export function config (options) {
  const localize = Object.assign({}, options)

  localize.$constants = constants
  if (localize.debug === undefined) {
    localize.debug = false
  }
  localize.$logger = new Logger(localize.debug)
  if (localize.mode === undefined || ['hot', 'stale'].indexOf(localize.mode) === -1) {
    localize.mode = 'stale'
  }
  if (localize.mode === 'hot') {
    localize.linked = []
  }
  localize.available.forEach(function (locale) {
    locale = locale.locale || locale  // # for locales with localize
    if (!localize.localizations[locale]) {
      localize.$logger
      console.warn('v-localize:\n  Localizations for locale ' + locale + ' not found.')
    }
  })
  if (!window.localStorage.getItem('localization')) {
    localize.locale = localize.default  // # default to default locale if session does not exist
  } else {
    const available = localize.available.map(function (locale) {
      return locale.locale || locale  // # reconstruct ignoring locale localize
    })
    if (available.indexOf(window.localStorage.getItem('localization')) === -1) {
      localize.locale = localize.default
    } else {
      localize.locale = window.localStorage.getItem('localization')
    }
  }
  window.localStorage.setItem('localization', localize.locale)  // # commit localization to local storage
  document.querySelector('html').setAttribute('lang', localize.locale)  // # change document lang
  if (!localize.fallback) {
    localize.fallback = 'N/A'  // # set default fallback
  }
  return localize
}
