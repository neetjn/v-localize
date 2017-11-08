beforeEach(function() {
  Vue.use(Localize)
  let localize = Localize.config(mocks.config)
  App = new Vue({
    el: '#app',
    localize,
    data: {
      lang: mocks.config.default
    }
  })
})
