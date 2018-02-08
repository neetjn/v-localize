beforeEach(function(done) {
  Vue.use(Localize)
  let localize = Localize.config(mocks.config)
  App = new Vue({
    el: '#app',
    localize,
    data: {
      lang: localize.default
    }
  })
  setTimeout(done, 0)
})
