import $locale from './locale.js'
import localize from './localize.js'

export default function (Vue, options) {
  Vue.mixin({
    methods: {
      $locale
    }
  })  // # define global mixin
  Vue.directive('localize', localize)
}
