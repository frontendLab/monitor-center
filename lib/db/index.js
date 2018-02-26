/**
 * 数据库
 */
const mysql  = require('mysql');
const log = require('../log');
const API_MONITOR_KEYS = ['url', 'desc', 'response', 'param', 'app', 'ua', 'referer', 'date', 'others']

const pool =  mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'bf',
  database: 'monitor_center'
})

function executeSql( sql ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection){    
      //run the query
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
    log('[dberror]' + err)
  }
}

// 监控表插入数据
async function insertApiMonitor(data) {
  let rows = []
  let values = []
  // 过滤掉不合法的key
  Object.keys(data).filter(v => {
    return API_MONITOR_KEYS.indexOf(v) > -1;
  }).forEach(val => {
    rows.push(`api_monitor.` + val)
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



