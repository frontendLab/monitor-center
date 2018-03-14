const fs = require('fs');
const path = require('path');
const mail = require('../../lib/mail');
const util = require('../../lib/util');
const db = require('../../lib/db');
const { apiMonitorErrorType, groupDeveLoperMail } = require('../../lib/const');

// 邮件模板
let mailTemplate = '';
fs.readFile(path.join(__dirname, './mailTemplate.html'), (err, data) => {
  mailTemplate = data.toString()
})

// 发邮件
function sendMail (info) {
  info.typeDesc = apiMonitorErrorType[info.type] || '未知错误'
  const to = groupDeveLoperMail[info.group] || groupDeveLoperMail['0']
  const content = util.sub(mailTemplate, info)
  mail(to, '【接口异常提醒】', content)
}
/**
 * 测试方式：
 * 
 * get接口
 * http://localhost:3000/am?url=http%3A%2F%2Ftest-startdt-offical.startdtapi.com%2Fauth%2Fcompany%2Fsimple%2Finfo&param=%7B%22city%22%3A1303%2C%22storeName%22%3A%22%22%2C%22storeStatus%22%3A%221%22%2C%22currentPage%22%3A1%2C%22pageSize%22%3A20%7D&response=%7B%22success%22%3Afalse%2C%22codeNum%22%3A0%2C%22codeDesc%22%3A%22%E7%B3%BB%E7%BB%9F%E5%BC%82%E5%B8%B8%22%2C%22value%22%3A%22%22%7D&desc=%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%93%8D%E5%BA%94%E5%BC%82%E5%B8%B8&app=1&type=1
 *
 * post接口 
 * 
 * var xmlhttp = new XMLHttpRequest()
 * xmlhttp.open("POST","http://localhost:3000/am",true);
 * xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
 * xmlhttp.send("url=http%3A%2F%2Ftest-startdt-offical.startdtapi.com%2Fauth%2Fcompany%2Fsimple%2Finfo&param=%7B%22city%22%3A1303%2C%22storeName%22%3A%22%22%2C%22storeStatus%22%3A%221%22%2C%22currentPage%22%3A1%2C%22pageSize%22%3A20%7D&response=%7B%22success%22%3Afalse%2C%22codeNum%22%3A0%2C%22codeDesc%22%3A%22%E7%B3%BB%E7%BB%9F%E5%BC%82%E5%B8%B8%22%2C%22value%22%3A%22%22%7D&desc=%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%93%8D%E5%BA%94%E5%BC%82%E5%B8%B8&app=1&type=1");
 */
module.exports = {
  request: ctx => {
    let isGetMethod = ctx.request.method === 'GET'
    let tips = util.getRequestBaseInfo(ctx)
    let query, params, config
    if (isGetMethod) {
      ctx.type = 'gif'
      ctx.body = util.imgbuf
      query = ctx.query
      params = JSON.parse(decodeURIComponent(query.params)) || {}
      config = JSON.parse(decodeURIComponent(query.config)) || {}
    } else {
      ctx.body = ''
      query = ctx.request.body
      params = query.params || {}
      config = query.config || {}
    }
    let info = {
      ...tips,
      ...params
    }
    // 插入数据库
    if (!config.noInsertDb) {
      db.insertApiMonitor(info)
    }
    // 发送邮件
    if (!config.noSendMail) {
      sendMail(info)
    }
  }
}