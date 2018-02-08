{ directive } = require './localize.coffee'
{ locale } = require './locale.coffee'

module.exports =
  install: (Vue, options) ->
    Vue.directive('localize', directive)
    Vue.mixin # define global mixin
      methods:
        $locale: locale
