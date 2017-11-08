describe('v-localize', function() {
  describe('mixin', function() {
    it('should update localizations immediately in hot mode', function(done) {
      document.querySelector('option[value="es-SP"]').click() // # change locale
      let check = setInterval(() => {
        let element = document.querySelector('#titleLocalized')
        if (element.innerText == mocks.config.localizations['es-SP'].header.title) {
          clearInterval(check)
          done()
        }
        console.log(element.innerText)
      }, 10)
    })
  })
})
