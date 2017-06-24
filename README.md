# **V-Localize**

### About

**V-Localize** is a very simple localization plugin for VueJS. Your localizations will be available anywhere in your web application wrapped in a Vue instance.

Default language, default phrase, and your entire localization map can be defined when installing the plugin.

### Usage

To install via Bower, simply do the following:
```sh
bower install v-localize
```
or you can install via npm:
```sh
npm install v-localize
```
Installing the plugin is then as simple as:

```js
import { Localize } from 'v-localize';

Vue.use(Localize);

let localize = Localize.config({
  default: 'en',
  available: ['en-US', 'es-SP', 'pr-BR'],
  fallback: '?',
  localizations: {
    "en-US": {
      header: {
        title: 'English'
      }
    },
    "es-SP": {
      header: {
        title: 'Spanish'
      }
    },
    "pr-BR": {
      header: {
        title: 'Portuguese'
      }
    }
  }
});

new Vue({
  el: '#app',
  localize
});
```

Once your Vue app has been instantiated, the language can be changed by calling `$locale()` from your Vue instance. This will set your desired localization in local storage and reload your current window.

```html
<button @click="$locale('en-US')">English</button>
<button @click="$locale('es-SP')">Spanish</button>
```

You can specify your localizations like so,
```html
<!-- Will add a localized title to this element targeting en-US -->
<h1 v-localize="{item: 'header.title', locale: 'en-US', attr: 'title'}">Hello World</h1>
<!-- Will replace this element's text with localized item -->
<h2 v-localize="{item: 'header.title'}"></h2>
```

### Configuration

The plugin takes 4 options,

- `default`: Default language key to target if not set already.
- `available`: List of available localizations.
- `fallback`: Default text to show if localization for current language not found. If not specified, will default to `'N/A'`.
- `localizations`: JSON object for localizations. ex;
   ```js
  {
    "en-US": { // language branch
      "header": "Hello World!", // localization
      "nav": {
        "home": "Home" // nested localization
      }
    }
  }
   ```

### Support

**V-Localize** was developed using VueJS 2.x, support previous versions is not available.

---
Copyright (c) 2017 John Nolette Licensed under the MIT license.
