{ version } = require '../package.json'

module.exports =
  constants:
    version: version,
    regex:
      # regex for searching for locale
      item: /([a-zA-Z$]{1,}).*?/g
