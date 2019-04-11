require('jest-dom/extend-expect')
const { mount, createLocalVue } = require('vue-test-utils')
const Localize = require('../dist/v-localize')
const MockConfig = require('./mock.config')

describe('Plugin', () => {
  const context = {}

  beforeEach(() => {
    document.body.innerHTML = `
      <root />
    `
    const RootComponent = {
      template: `
      <div id="root">
        <h1>test</h1>
      </div>
      `
    }
    const Vue = createLocalVue()
    Vue.use(Localize)
    const localize = Localize.config(MockConfig)
    const App = mount(RootComponent, { Vue, localize })

    context.App = App
  })

  it('should install plugin as expected', function() {
    // const tag = document.querySelector('root')
    // console.log(tag)
    // console.log(document.body.innerHTML)
    // const field = document.querySelector('input[type="password"]')
    // expect(field._tag).toBeDefined()
    // console.log(context.App.find('h1'))
    // left here, figure out why mixin method is not being propagated
    console.log(context.App.vm)
  })
})
