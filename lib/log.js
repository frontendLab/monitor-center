/**
 * 日志
 */
const log4js = require('log4js');
const path = require('path')
log4js.configure({
  appenders: { 
    file: { 
      type: 'file', 
      filename: path.resolve(__dirname, '../log/log.log'),
      maxLogSize: 30 * 1024 * 1024, // = 200Mb
      // compress: true, // compress the backups
      encoding: 'utf-8'
    }
  },
  categories: { 
    default: { appenders: ['file'], level: 'trace' }
  }
});
const logger = log4js.getLogger('monitor-center');
function log(msg, type) {
  logger[type || 'error'](msg);
}
log('ssss')
module.exports = log;




// [2018-02-23T17:55:16.685] [ERROR] cheese - Cheese is too ripe!
// [2018-02-23T17:55:16.688] [FATAL] cheese - Cheese was breeding ground for listeria.
