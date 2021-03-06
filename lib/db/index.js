/**
 * 数据库
 */
const mysql  = require('mysql')
const log = require('../log')
const { apiMonitorKeys, dbConfigOnline, dbConfigDev } = require('../const')
const { isOnline } = require('../util')
// const API_MONITOR_KEYS = 

const pool =  mysql.createPool(isOnline ? dbConfigOnline : dbConfigDev)

function executeSql( sql ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection){    
      // run the query
      connection.query(sql, function (error, results, fields) {
        if(error) {
          reject(error)
        } else {
          resolve(results)
        }
        connection.release()
      })
    })
  })
}

async function query(sql) {
  // let sql = 'select * from api_monitor'
  let dataList
  try {
    dataList = await executeSql(sql)
  } catch(err) {
    log(`[dberror]${err};errorsql:${sql}`)
  }
}

// 监控表插入数据
async function insertApiMonitor(data) {
  let rows = []
  let values = []
  // 过滤掉不合法的key 
  Object.keys(data).filter(v => {
    return apiMonitorKeys.indexOf(v) > -1;
  }).forEach(val => {
    rows.push(`api_monitor.${val}`)
    values.push(`'${data[val]}'`)
  })
  let sql = `insert into api_monitor (${rows.join()}) values (${values.join()})`
  try {
    await executeSql(sql)
  } catch(err) {
    log('[dberror]' + err)
  }
}

module.exports = {
  query,
  insertApiMonitor
}



