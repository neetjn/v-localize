module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['Electron'],
    customContextFile: 'context.html',
    frameworks: ['jasmine'],
    files: [
      'vendor/*.js',
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
