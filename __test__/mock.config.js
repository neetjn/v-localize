module.exports = {
  debug: true,
  default: 'en-US',
  available: ['en-US', 'es-SP', 'pr-BR', {
    locale: 'ar-MS',
    orientation: 'rtl',
    font: {
      size: 'smaller',
      family: 'test'
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
