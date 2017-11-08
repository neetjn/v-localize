beforeEach(function(done) {
  localStorage = mocks.storageMock()
  Vue.use(Localize)
  let localize = Localize.config(mocks.config)
  App = new Vue({
    el: '#app',
    localize,
    data: {
      lang: localize.default
    }
  })
  window.setTimeout(done, 0)
})
