describe('v-localize', function() {

  beforeEach(function() {
    Vue.use(Localize)
    App = new Vue({
      el: '#app',
      localize: mocks.config,
      data: {
        lang: mocks.config.default
      }
    })
  })

  describe('directive', function() {
    it('should localize element text on startup', function(done) {
      setTimeout(() => {
        let element = document.querySelector('titleLocalized')
        expect(element.text).toBe(mocks.config.localizations['en-US'].header.title)
        done()
      }, 10)
    })
  })

})
