const mail = require('../lib/mail');
const util = require('../lib/util');
const db = require('../lib/db');
const { apiMonitorErrorType } = require('../lib/const');

// 邮件模板
const  mailTemplate = `<!Doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Simple Transactional Email</title>
    <style>
      .api-monitor-table {
        font-size: 12px;
        min-width: 300px;
        word-wrap: break-word;
        word-break: break-all;
        border: solid 1px #f1f1f1;
        border-collapse: collapse;
        color: #666;
      }
      .api-monitor-table .name {
        width: 80px;
        background: #fcfcfc;
        font-weight: 600;
        font-size: 14px;
        color: #333;
      }
      .api-monitor-table .title {
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        color: #000;
        background: #f6f8fa;
      }
      .api-monitor-table td {
        padding: 10px;
        border: solid 1px #f1f1f1;
      }
    </style>
  </head>
  <body >
    <table class="api-monitor-table">
      <tr>
        <td colspan="2" class="title">前端接口异常提醒</td>
      </tr>
      <tr>
        <td class="name">接口地址：</td>
        <td class="value">{url}</td>
      </tr>
      <tr>
        <td class="name">接口响应：</td>
        <td class="value">{response}</td>
      </tr>
      <tr>
        <td class="name">前端参数：</td>
        <td class="value">{param}</td>
      </tr>
      <tr>
        <td class="name">用户UA：</td>
        <td class="value">{ua}</td>
      </tr>
      <tr>
        <td class="name">页面地址：</td>
        <td class="value">{referer}</td>
      </tr>
      <tr>
        <td class="name">错误类型：</td>
        <td class="value">{typeDesc}</td>
      </tr>
      <tr>
        <td class="name">错误描述：</td>
        <td class="value">{desc}</td>
      </tr>
      <tr>
        <td class="name">请求时间：</td>
        <td class="value">{date}</td>
      </tr>
    </table>
  </body>
</html>`;

function sendMail (info) {
  info.typeDesc = apiMonitorErrorType[info.type] || '未知错误'
  if (!info.noSendMail) {
    mail(info.app, '【接口异常提醒】', util.sub(mailTemplate, info));
  }
}

/**
 * 测试用：
 * get接口
 * http://localhost:3000/am?url=http%3A%2F%2Ftest-startdt-offical.startdtapi.com%2Fauth%2Fcompany%2Fsimple%2Finfo&param=%7B%22city%22%3A1303%2C%22storeName%22%3A%22%22%2C%22storeStatus%22%3A%221%22%2C%22currentPage%22%3A1%2C%22pageSize%22%3A20%7D&response=%7B%22success%22%3Afalse%2C%22codeNum%22%3A0%2C%22codeDesc%22%3A%22%E7%B3%BB%E7%BB%9F%E5%BC%82%E5%B8%B8%22%2C%22value%22%3A%22%22%7D&desc=%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%93%8D%E5%BA%94%E5%BC%82%E5%B8%B8&app=1&type=1
 *
 * post接口
 * var xmlhttp = new XMLHttpRequest()
 * xmlhttp.open("POST","http://localhost:3000/am",true);
 * xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
 * xmlhttp.send("url=http%3A%2F%2Ftest-startdt-offical.startdtapi.com%2Fauth%2Fcompany%2Fsimple%2Finfo&param=%7B%22city%22%3A1303%2C%22storeName%22%3A%22%22%2C%22storeStatus%22%3A%221%22%2C%22currentPage%22%3A1%2C%22pageSize%22%3A20%7D&response=%7B%22success%22%3Afalse%2C%22codeNum%22%3A0%2C%22codeDesc%22%3A%22%E7%B3%BB%E7%BB%9F%E5%BC%82%E5%B8%B8%22%2C%22value%22%3A%22%22%7D&desc=%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%93%8D%E5%BA%94%E5%BC%82%E5%B8%B8&app=1&type=1");
 */
module.exports = {
  request: ctx => {
    let header = ctx.request.header,
      tips = util.getRequestBaseInfo(ctx),
      query = util.decodeData(ctx.request.method === 'POST' ? ctx.request.body: ctx.query),
      info = {
        ...tips,
        ...query
      };
    db.insertApiMonitor(info);
    ctx.body = ''
    sendMail(info);
  }
}