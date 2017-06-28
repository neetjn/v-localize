import locale from './locale.js'
import localize from './localize.js'

export default function (Vue, options) {
  Vue.prototype.$locale = locale
  Vue.directive('localize', localize)
}
