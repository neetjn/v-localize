import { locale } from './locale.js'
import { directive } from './localize.js'

export default function install (Vue, options) {
  Vue.mixin({
    methods: {
      $locale: locale
    }
  })  // # define global mixin
  Vue.directive('localize', directive)
}
