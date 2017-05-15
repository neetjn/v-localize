# **Vue Localize**

> Simple localization plugin for the amazing VueJS.

### About

**Vue Localize** is a very simple localization plugin for VueJS. Your localizations will be available anywhere in your web application wrapped in a Vue instance.

Default language, default phrase, and your entire localization map can be defined when installing the plugin.

### Usage

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

Once your Vue app has been instantiated, the language can be changed by calling `$setLang()` from your Vue instance.

```html
<button @click="$setLang('en')">English</button>
<button @click="$setLang('sp')">Spanish</button>
```

### Configuration

The plugin takes 3 options,

- `lang_default`: Default language key to target if not set already.
- `localizations`: JSON object for localizations. ex;
   ```js
   {
     "en": { // language branch
       "header": "Hello World!", // localization
       "nav": {
         "home": "Home" // nested localization
       }
     }
   }
   ```
- `locale_default`: Default text to show if localization for current language not found. If not specified, will default to `'N/A'`.

### Support

**Vue Localize** was developed using VueJS 2.x, support previous versions is not available.

---
Copyright (c) 2017 John Nolette Licensed under the MIT license.
