class Logger

  ###
   * Logging interface for v-localize
   * @param {bool} debugging - Debug to console.
  ###
  constructor: (@debugging) ->
    @logs = []
    Object.defineProperty this, 'time', get: ->
      (new Date).getTime()

  ###
   * Format log for logstore
   * @param {string} message - message to log.
   * @param {int} timestamp - timestamp for log.
  ###
  _format: (message, timestamp) ->
    return "[#{new Date(timestamp)}]: (v-localize) \"#{message}\""

  ###
   * Fetch logs, allows for filtering by type.
   * @param {string} type - Log type to filter by.
   * @returns {Array}
  ###
  $get: (type) ->
    this.logs.filter log -> type ? log.type == type : true

  ###
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
  ###
  log: (message) ->
    timestamp = @time
    if @debugging
      console.log @_format(message, timestamp)
    @logs.push
      type: 'log'
      message: timestamp

  ###
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
  ###
  warn: (message) ->
    timestamp = @time
    if @debugging
      console.warn @_format(message, timestamp)
    @logs.push
      type: 'warning'
      message: timestamp

  ###
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
  ###
  error: (message) ->
    timestamp = @time
    if @debugging
      console.error @_format(message, timestamp)
    @logs.push
      type: 'critical'
      message: timestamp

module.exports =
  Logger: Logger
