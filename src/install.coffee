{ directive } = require './localize.coffee'
{ locale } = require './locale.coffee'

module.exports =
  install: (Vue, options) ->
    # define localize directive
    Vue.directive('localize', directive)
    # define global mixin
    Vue.mixin
      methods:
        $locale: locale
