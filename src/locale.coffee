module.exports =
  ###
   * v-localize $locale(args*) mixin
   * @param {string} lang - Language to change to.
  ###
  locale: (opts = null) ->
    vue = @$root.$options._base
    localize = @root.$options.localize
    if opts
      if opts.l
        if localize.available.find((e) -> e.locale or e == opts.l)
          localize.locale = opts.l # update our locale
          if localize.webStore
            # update session localization
            window.localStorage.setItem('localization', opts.l)
          localize.nodes.forEach (e) ->
            # update all directive bindings
            vue.directive('localize').bind(e.el, e.binding, e.vm)
          if typeof(document) != 'undefined'
            # change document lang
            document.querySelector('html').setAttribute('lang', opts.l)
        else
          localize.$logger.error(
            "Locale \"#{ opts.lang }\" not defined in configuration.")
      else if opts.i
        # get localization tree
        localizations = localize.localizations[opts.t || localize.locale]
        branches = opts.i.match(localize.$constants.regex.item)
        # not using forEach for hard escape
        for i in branches
          branch = branches[i]
          localization = localizations[branch]
          if (localization == undefined)
            throw new Error("Cannot read property for \"#{ branch }\".")
        return localization
    else
      return localize.locale
