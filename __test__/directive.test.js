require('jest-dom/extend-expect')

const Vue = require('vue')
const Localize = require('../dist/v-localize')

const MockConfig = require('./mock.config')

describe('Plugin', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <root />
    `

    Vue.use(Localize)
    const localize = Localize.config(MockConfig)
    const RootComponent = {
      template: `
      <div id="root">
        <h1>test</h1>
      </div>
      `
    }
    const App = Vue.extend(RootComponent)
    // eslint-disable-next-line
    const vm = new App({
      localize
    }).$mount('root')
  })

  it('should install plugin as expected', function() {
    const tag = document.querySelector('root')
    console.log(tag)
    console.log(document.body.innerHTML)
    // const field = document.querySelector('input[type="password"]')
    // expect(field._tag).toBeDefined()
  })
})
