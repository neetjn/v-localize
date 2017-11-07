<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/ymhxqZ47jLBFuVrU2iywqLGC/neetjn/v-localize'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/ymhxqZ47jLBFuVrU2iywqLGC/neetjn/v-localize.svg' />
</a>

# **V-Localize**

[![build](https://travis-ci.org/neetjn/v-localize.svg?branch=master)](https://travis-ci.org/neetjn/v-localize/)
[![npm version](https://badge.fury.io/js/v-localize.svg)](https://badge.fury.io/js/v-localize)
[![Code Health](https://landscape.io/github/neetjn/v-localize/master/landscape.svg?style=flat)](https://landscape.io/github/neetjn/v-localize/master)

[![NPM](https://nodei.co/npm/v-localize.png)](https://nodei.co/npm/v-localize/)

### About

**V-Localize** is a very simple localization plugin for Vue.js. Your localizations will be available anywhere in your web application wrapped in a Vue instance.

### Support

| Chome  | Edge | Firefox | Opera    | Safari |
|--------|------|---------|----------|--------|
| 4.0+ ✔ |  ✔   | 3.5+ ✔  | 10.50+ ✔ | 4.0+ ✔ |

**V-Localize** was developed using Vue.js 2.x, support previous versions is not available.

### Usage

To install via Bower, simply do the following:
```sh
bower install v-localize
```
To install via NPM:
```sh
npm install v-localize
```
For a quick start using jsdelivr:
```html
<script src="https://cdn.jsdelivr.net/npm/v-localize/dist/v-localize.js"></script>
```
Installing the plugin is then as simple as:

```js
import Localize from 'v-localize';

Vue.use(Localize);

let localize = Localize.config({
  default: 'en-US',
  mode: 'hot',
  available: ['en-US', 'es-SP', {
    locale: 'ar-MS',
    orientation: 'rtl',
    font: {
      size: 'smaller'
    }
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
<!-- Will fetch current locale -->
<h1>Locale: {{ $locale() }}</h1>
```

### Configuration

The plugin takes 5 options,

> **`debug`**: If enabled, will spit warnings and errors to console.

> **`mode`**: Will default to `stale`, which will commit changes to local storage -- a window reload is necessary to view changes. To automatically reload the window, set the mode to `reload`. May be set to `hot` for real-time updates to binded directives.

> **`default`**: Default language key to target if not set already.

> **`available`**: List of available localizations, can optionally specify locale options. ex;
  ```js
  ['en-US', 'es-SP', 'pr-BR', {
    locale: 'ar-MS',
    orientation: 'rtl'
  }]
  ```

> **`fallback`**: Default text to show if localization for current language not found. If not specified, will default to `'N/A'`.

> **`localizations`**: JSON object for localizations.
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

> **`orientation`**: Text direction of target element, useful for orientation of script languages.

> **`font.family`**: Font family to change to. Re: [https://www.w3schools.com/jsref/prop_style_fontfamily.asp]()

> **`font.size`**: Font size to scale to. Re: [https://www.w3schools.com/jsref/prop_style_fontsize.asp]()

### Contributors

* **John Nolette** (john@neetgroup.net)

Contributing guidelines are as follows,

* Any new features must include either a unit test, e2e test, or both.
* Branches for bugs and features should be structued like so, `issue-x-username`.
* Before putting in a pull request, be sure to verify you've built all your changes.

  Travis will build your changes before testing and publishing, but bower pulls from this repository directly.

* Include your name and email in the contributors list.

---
Copyright (c) 2017 John Nolette Licensed under the MIT license.
