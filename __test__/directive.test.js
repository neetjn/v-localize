require('jest-dom/extend-expect')

// const Vue = require('vue')
// const Localize = require('../dist/v-localize')

// const MockConfig = require('./mock.config')

describe('Plugin', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <root />
    `
  })

  it('should install plugin as expected', function() {
    const tag = document.querySelector('root')
    console.log(tag)
    // const field = document.querySelector('input[type="password"]')
    // expect(field._tag).toBeDefined()
  })
})
