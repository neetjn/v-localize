require('jest-dom/extend-expect')
const { mount, createLocalVue } = require('@vue/test-utils')
const Localize = require('../dist/v-localize')
const MockConfig = require('./mock.config')

describe('Plugin', () => {
  const ctx = {}
  const generalWaitDelay = 500

  beforeEach(() => {
    document.body.innerHTML = `
      <root />
    `
    const RootComponent = {
      template: `
      <div id="root">
        <div id="content">
          <h1 v-localize="{i: 'header.title'}"></h1>
          <h2 v-localize="{i: 'header.title', t: 'es-SP', attr: 'title'}"></h2>
        </div>
        <div id="languages">
          <button id="en-locale" @click="$locale('en-US')">English</button>
          <button id="sp-locale" @click="$locale('es-SP')">Spanish</button>
          <button id="pr-locale" @click="$locale('pr-BR')">Portuguese</button>
          <button id="ar-locale" @click="$locale('ar-MS')">Arabic</button>
        </div>
      </div>
      `
    }
    const localVue = createLocalVue()
    localVue.use(Localize)
    const localize = Localize.config(MockConfig)
    const App = mount(RootComponent, { localVue, localize })

    ctx.localize = localize
    ctx.App = App
  })

  it('should install plugin as expected', () => {
    const vm = ctx.App.vm
    expect(vm.$locale).toBeDefined()
    expect(vm.$options.localize).toBeDefined()
    expect(vm.$options.localize).toEqual(ctx.localize)
    // left here, figure out if we can clean up data/opts and opts instantion
  })

  it('should initialize directive as expected', (done) => {
    const App = ctx.App
    setTimeout(() => {
      expect(App.find('h1').text()).toEqual(MockConfig.localizations['en-US'].header.title)
      expect(App.find('h2').attributes().title).toEqual(MockConfig.localizations['es-SP'].header.title)
      done()
    }, generalWaitDelay)
  })

  it('should appropriately update directives when locale is changed', (done) => {
    const App = ctx.App
    setTimeout(() => {
      App.find('button#pr-locale').trigger('click')
      setTimeout(() => {
        // left here, figure out why english locale is being returned
        expect(App.find('h1').text()).toEqual(MockConfig.localizations['pr-BR'].header.title)
        expect(App.find('h2').attributes().title).toEqual(MockConfig.localizations['es-SP'].header.title)
        done()
      }, generalWaitDelay)
    }, generalWaitDelay)
  })

  // TODO: add test for font weight and font family
  // TODO: add test for text direction
})
