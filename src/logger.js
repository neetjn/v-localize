export class Logger {

  /**
   * Logging interface for the riot-view-router mixin.
   * @param {Router} router - Router for utilities to reference
   */
  constructor (router) {
    this.$router = router
    this.logs = []

    Object.defineProperty(this.$router, 'time', {
      get: function () {
        return new Date().getTime()
      }
    })
  }

  /**
   * Fetch logs, allows for filtering by type.
   * @param {string} type - Log type to filter by.
   * @returns {Array}
   */
  $get (type) {
    return this.logs.filter((log) => type ? log.type == type : true)
  }

  /**
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  log (message) {
    var self = this.$router
    let time = self.time

    if (self.debugging)
      console.log(`[${new Date(time).toString()}]: "${message}"`)

    this.logs.push({ type: 'general', message, time })
  }

  /**
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  warn (message) {
    var self = this.$router
    let time = self.time

    if (self.debugging)
      console.warn(`[${new Date(time).toString()}]: "${message}"`)

    this.logs.push({ type: 'warning', message, time })
  }

  /**
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  error (message) {
    var self = this.$router
    let time = self.time

    if (self.debugging)
      console.error(`[${new Date(time).toString()}]: "${message}"`)

    this.logs.push({ type: 'critical', message, time })
  }

}
