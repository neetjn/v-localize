describe('v-localize', function() {
  describe('directive', function() {
    it('should localize element text on startup', function(done) {
      let check = setInterval(() => {
        let element = document.querySelector('#titleLocalized')
        if (element.innerText == mocks.config.localizations['en-US'].header.title) {
          clearInterval(check)
          done()
        }
      }, 250)
    })
    it('should localize attribute on startup', function(done) {
      let check = setInterval(() => {
        let element = document.querySelector('#attributeLocalized')
        if (element.getAttribute('title') == mocks.config.localizations['en-US'].header.title) {
          clearInterval(check)
          done()
        }
      }, 250)
    })
  })
})
