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
  available: ['en-US', 'es-SP', 'pr-BR', {
    locale: 'ar-MS',
    orientation: 'rtl'
  }],
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
    },
    "ar-MS": {
      header: {
        title: 'Arabic'
      }
    }
  }
});

new Vue({
  el: '#app',
  localize
});
```

Once your Vue app has been instantiated, the language can be changed by calling `$locale(args*)` from your Vue instance. This will set your desired localization in local storage and reload your current window.

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
Alternatively, you can get your current localization by calling `$locale()` without specifying a language.
```html
<h1>Locale: {{ $locale() }}</h1>
```

### Configuration

The plugin takes 5 options,

- `debug`: If enabled, will spit warnings and errors to console.
- `default`: Default language key to target if not set already.
- `available`: List of available localizations, can optionally specify locale options. ex;
  ```js
  ['en-US', 'es-SP', 'pr-BR', {
    locale: 'ar-MS',
    orientation: 'rtl'
  }]
  ```
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

### Locale Options

Locale configuration currently supports the following options,

- `orientation`: Text direction of body, useful for orientation of script languages.

### Support

**V-Localize** was developed using VueJS 2.x, support previous versions is not available.

---
Copyright (c) 2017 John Nolette Licensed under the MIT license.
