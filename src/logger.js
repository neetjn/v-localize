export class Logger {

  /**
   * Logging interface for v-localize
   * @param {bool} debugging - Debug to console.
   */
  constructor (debugging) {
    this.debugging = debugging
    this.logs = []

    Object.defineProperty(this, 'time', {
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
    return this.logs.filter((log) => type ? log.type === type : true)
  }

  /**
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  log (message) {
    const time = this.time
    if (this.debugging) {
      console.log(`[${new Date(time).toString()}]: "${message}"`)
    }
    this.logs.push({ type: 'general', message, time })
  }

  /**
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  warn (message) {
    const time = this.time
    if (this.debugging) {
      console.warn(`[${new Date(time).toString()}]: "${message}"`)
    }
    this.logs.push({ type: 'warning', message, time })
  }

  /**
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  error (message) {
    const time = this.time
    if (this.debugging) {
      console.error(`[${new Date(time).toString()}]: "${message}"`)
    }
    this.logs.push({ type: 'critical', message, time })
  }

}
