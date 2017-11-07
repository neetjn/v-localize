import { directive } from './localize.js'
import { locale } from './locale.js'

export function install (Vue, options) {
  Vue.directive('localize', directive)
  Vue.mixin({
    methods: {
      $locale: locale
    }
  })  // # define global mixin
}
