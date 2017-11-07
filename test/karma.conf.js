
module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['Electron'],
    frameworks: ['jasmine', 'riot'],
    files: [
      '../dist/v-localize.js',
      'mocks.js',
      'unit/helpers/*.js',
      'unit/spec.*.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true
  })
}
