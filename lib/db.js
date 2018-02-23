const mysql  = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bf',
  database: 'monitor_center'
})


function executeSql( sql ) {
  return new Promise(( resolve, reject ) => {
    connection.connect();
    connection.query(sql, function (error, results, fields) {
      if(error) {
        reject(error)
      } else {
        resolve(results)
      }
      connection.end();
    })
  })
}
async function query(sql) {
  // let sql = 'select * from api_monitor'
  let dataList
  try {
    dataList = await executeSql(sql)
  } catch(e) {
    
  }
}
query('select * from api_monitor')