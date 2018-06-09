{ constants } = require './constants.coffee'
{ Logger } = require './logger.coffee'

module.exports =
  ###
   * v-localize configuration builder
   * @param {object} options - v-localize options.
  ###
  config: (options) ->
    localize = Object.assign({ }, options)
    localize.$constants = constants
    localize.debug = localize.debug or false
    localize.$logger = new Logger(localize.debug)
    localize.nodes = []
    # integrity checks
    available = localize.available.map (locale) ->
      locale.locale or locale
    # for locales with localize
    available.forEach (locale) ->
      if !localize.localizations[locale]
        throw Error("Localizations for locale \"#{ locale }\" not found.")
    localize.webStore = localize.webStore and typeof(window) != 'undefined'
    if localize.webStore
      webCached = window.localStorage.getItem('locale')
      if webCached and available.find((locale) -> locale == webCached)
        localize.locale = webCached
      else
        # default to default locale
        localize.locale = localize.default
        # commit localization to local storage
        window.localStorage.setItem('locale', localize.locale)
    else
      # default to default locale
      localize.locale = localize.default
    if typeof(document) != 'undefined'
      # change document lang
      document.querySelector('html').setAttribute('lang', localize.locale)
    localize.defaultFallback = localize.defaultFallback or false
    localize.fallback = localize.fallback or 'N/A'
    return localize
