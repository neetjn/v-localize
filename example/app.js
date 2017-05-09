Vue.use(VueLocalize, {
	lang_default: 'en',
	localizations: {
    en: {
      header: {
        title: 'Hello World!'
      },
      body: {
      	content: 'Today is the 5th of May.'
      }
    },
    sp: {
      header: {
        title: 'Hola Mundo!'
      },
      body: {
      	content: 'Hoy es el cinco de Mayo.'
      }
    }
  },
  locale_default: '???'
}); // # install our plugin

const App = new Vue({
  el: '#app'
}); // # instantiate our app
