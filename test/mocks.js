const mocks = {

  /**
   * Mock for local storage
   */
  storageMock() {
    var storage = {};

    return {
      setItem: function(key, value) {
        storage[key] = value || '';
      },
      getItem: function(key) {
        return key in storage ? storage[key] : null;
      },
      removeItem: function(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function(i) {
        var keys = Object.keys(storage);
        return keys[i] || null;
      }
    }
  },

  /**
   * v-localize configuration
   */
  config: {
    debug: true,
    mode: 'hot',
    default: 'en-US',
    available: ['en-US', 'es-SP', 'pr-BR', {
      locale: 'ar-MS',
      orientation: 'rtl',
      font: {
        size: 'smaller'
      }
    }],
    fallback: '?',
    localizations: {
      'en-US': {
        header: {
          title: 'English'
        }
      },
      'es-SP': {
        header: {
          title: 'Spanish'
        }
      },
      'pr-BR': {
        header: {
          title: 'Portuguese'
        }
      },
      'ar-MS': {
        header: {
          title: 'Arabic'
        }
      }
    }
  }

}

if (typeof module !== 'undefined')
  module.exports = mocks
