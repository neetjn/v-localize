{ directive } = require './localize'
{ locale } = require './locale'

module.exports =
  install: (Vue, options) ->
    Vue.directive('localize', directive)
    Vue.mixin # define global mixin
      methods:
        $locale: locale
