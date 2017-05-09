# **Vue Localize**

> Simple localization plugin for the amazing VueJS.

**Vue Localize** is a very simple localization plugin for VueJS. Your localizations will be available anywhere in your web application wrapped in a Vue instance.

Default language, default phrase, and your entire localization map can be defined when installing the plugin.

### Example Use

```js
import { VueLocalize } from './vendor/vue-localize.js'

const localizations =
{
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
};

Vue.use(VueLocalize, {
  lang_default: 'en',
	localizations: localizations,
  locale_default: '???'
}); // # install our plugin

const App = new Vue({
  el: '#app'
}); // # instantiate our app
```

---
Copyright (c) 2017 John Nolette Licensed under the MIT license.
