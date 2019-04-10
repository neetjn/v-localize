import 'jest-dom/extend-expect'
import fetch from 'node-fetch'
import * as riot from 'riot'
import PasswordKnown from '../dist/riot-is-password-known.js'

// # pollyfill for fetch
// eslint-disable-next-line
window.fetch = fetch

// # install password known plugin
PasswordKnown(riot)

riot.tag('root', `
  <form>
    <input type="password" data-is="password-known" />
    <script>
      const self = this

      self.passwordStatus = null
      self.on('passwordKnown', function(matched) {
        self.passwordStatus = matched
      })
    </script>
  </form>
`)

describe('Plugin', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <root />
    `
    riot.mount('root')
  })

  it('should install the tag as expected', function() {
    const field = document.querySelector('input[type="password"]')
    expect(field._tag).toBeDefined()
  })

  it('should bind tag field as expected', function(done) {
    const context = this

    const container = document.querySelector('root')
    context.reached = false
    container._tag.on('passwordKnown', function(result) {
      expect(result.found).toBeTruthy()
      expect(result.count).toBeGreaterThanOrEqual(23174662)
      context.reached = true
    })

    const field = document.querySelector('input[type="password"]')
    field.value = '123456'
    field.dispatchEvent(new Event('keyup'))

    setTimeout(function() {
      expect(context.reached).toBeTruthy()
      done()
    }, 1500)
  })
})
