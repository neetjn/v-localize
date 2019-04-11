require('jest-dom/extend-expect')
const { mount, createLocalVue } = require('@vue/test-utils')
const Localize = require('../dist/v-localize')
const MockConfig = require('./mock.config')

describe('Plugin', () => {
  const ctx = {}

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
    const localVue = createLocalVue()
    localVue.use(Localize)
    const localize = Localize.config(MockConfig)
    const App = mount(RootComponent, { localVue, localize })

    ctx.App = App
  })

  it('should install plugin as expected', function() {
    const vm = ctx.App.vm
    expect(vm.$locale).toBeDefined()
  })
})
