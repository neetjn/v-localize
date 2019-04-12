require('jest-dom/extend-expect')
const { mount, createLocalVue } = require('@vue/test-utils')
const Localize = require('../dist/v-localize')
const MockConfig = require('./mock.config')

// TODO: add tests for logger

describe('Plugin', () => {
  const ctx = {}
  const generalWaitDelay = 500

  const RootComponent = {
    template: `
    <div id="root">
      <div id="content">
        <h1 v-localize="{i: 'header.title'}"></h1>
        <h2 v-localize="{i: 'header.title', t: 'es-SP', attr: 'title'}"></h2>
      </div>
      <div id="languages">
        <button id="en-locale" v-on:click="changeLocale('en-US')">English</button>
        <button id="sp-locale" v-on:click="changeLocale('es-SP')">Spanish</button>
        <button id="pr-locale" v-on:click="changeLocale('pr-BR')">Portuguese</button>
        <button id="ar-locale" v-on:click="changeLocale('ar-MS')">Arabic</button>
      </div>
    </div>
    `,
    methods: {
      changeLocale: function(l) {
        this.$locale({ l })
      }
    }
  }

  beforeEach(() => {
    document.body.innerHTML = `
      <root />
    `
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
        expect(App.find('h1').text()).toEqual(MockConfig.localizations['pr-BR'].header.title)
        expect(App.find('h2').attributes().title).toEqual(MockConfig.localizations['es-SP'].header.title)
        done()
      }, generalWaitDelay)
    }, generalWaitDelay)
  })

  it('should appropriately modify dom element font/text based on locale options', (done) => {
    const App = ctx.App
    setTimeout(() => {
      App.find('button#ar-locale').trigger('click')
      setTimeout(() => {
        const h1 = App.find('h1')
        expect(h1.text()).toEqual(MockConfig.localizations['ar-MS'].header.title)
        const arLocale = MockConfig.available.find(l => l.locale == 'ar-MS')
        expect(h1.element.style.fontFamily).toEqual(arLocale.font.family)
        expect(h1.element.style.fontSize).toEqual(arLocale.font.size)
        expect(h1.attributes().dir).toEqual(arLocale.orientation)
        done()
      }, generalWaitDelay)
    }, generalWaitDelay)
  })
})
