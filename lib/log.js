/**
 * 日志
 */
const log4js = require('log4js')
const path = require('path')
const { isOnline } = require('./const')

log4js.configure({
  appenders: { 
    file: { 
      type: 'file', 
      filename: path.resolve(__dirname, '../logs/log.log'),
      maxLogSize: 100 * 1024 * 1024, // = 200Mb
      compress: true, // compress the backups
      encoding: 'utf-8'
    }
  },
  categories: { 
    default: { appenders: ['file'], level: 'trace' }
  }
})
const logger = log4js.getLogger('monitor-center')
function log(msg, type) {
  if (isOnline) {
    logger[type || 'error'](msg)
  } else {
    console.log(msg)
  }
}
module.exports = log

// [2018-02-23T17:55:16.685] [ERROR] cheese - Cheese is too ripe!
// [2018-02-23T17:55:16.688] [FATAL] cheese - Cheese was breeding ground for listeria.
