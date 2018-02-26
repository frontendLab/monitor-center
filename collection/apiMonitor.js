const mail = require('../lib/mail'),
  util = require('../lib/util'),
  mailTemplate = `<!Doctype html>
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
        <td colspan="2" class="title">
          前端接口异常提醒
        </td>
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
        <td class="name">Referer：</td>
        <td class="value">{referer}</td>
      </tr>
      <tr>
        <td class="name">错误类型：</td>
        <td class="value">{type}</td>
      </tr>
      <tr>
        <td class="name">错误描述：</td>
        <td class="value">{desc}</td>
      </tr>
      <tr>
        <td class="name">请求时间：</td>
        <td class="value">http://www.52shangou.com</td>
      </tr>
    </table>
  </body>
</html>`;

module.exports = ctx => {
  let header = ctx.request.header,
    tips = {
      ua: header['user-agent'],
      date: Date.now(),
      referer: header['referer'] || ''
    },
    query = util.decodeData(ctx.query),
    info = {
      ...tips, ...query
    };
  db.insertApiMonitor(info);
  ctx.body = info;
  if (!query.noSendMail) {
    mail(info.app, '【接口异常提醒】', 'Hello world?');
  }
}