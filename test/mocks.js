const mocks = {
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
