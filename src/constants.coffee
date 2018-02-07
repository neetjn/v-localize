{ versions } = require '../package'

module.exports =
  version: version,
  regex:
    # regex for searching for locale
    item: /([a-zA-Z$]{1,}).*?/g
