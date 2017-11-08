describe('v-localize', function() {

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

  describe('directive', function() {
    it('should localize element text on startup', function(done) {
      let check = setInterval(() => {
        let element = document.querySelector('#titleLocalized')
        if (element.innerText == mocks.config.localizations['en-US'].header.title) {
          clearInterval(check)
          done()
        }
      }, 10)
    })
    it('should localize attribute on startup', function(done) {
      let check = setInterval(() => {
        let element = document.querySelector('#attributeLocalized')
        if (element.getAttribute('title') == mocks.config.localizations['en-US'].header.title) {
          clearInterval(check)
          done()
        }
      }, 10)
    })
  })

})
