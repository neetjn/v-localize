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
   * Format log for logstore
   * @param {string} message - message to log.
   * @param {int} timestamp - timestamp for log.
   */
  _format(message, timestamp) {
    return `[${new Date(timestamp).toString()}]: (v-localize) "${message}"`
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
    const timestamp = this.time
    if (this.debugging) {
      console.log(this._format(message, timestamp))
    }
    this.logs.push({ type: 'general', message, timestamp })
  }

  /**
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  warn (message) {
    const timestamp = this.time
    if (this.debugging) {
      console.warn(this._format(message, timestamp))
    }
    this.logs.push({ type: 'warning', message, timestamp })
  }

  /**
   * Pushes provided message to log store.
   * @param {string} message - Message to log.
   */
  error (message) {
    const timestamp = this.time
    if (this.debugging) {
      console.error(this._format(message, timestamp))
    }
    this.logs.push({ type: 'critical', message, timestamp })
  }

}
