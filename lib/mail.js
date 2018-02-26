/**
 * 日志
 */
const nodemailer = require('nodemailer');
const log = require('./log');
const util = require('./util');

const USER_LIST = {
  '1': 'hanjiaping@startdt.com,zhouxiaohao@startdt.com',
  '2': 'laixuejiao@startdt.com,huangzhenhua@startdt.com',
  '3': 'zhuzheng@startdt.com,xuhuihui@startdt.com',
  '4': 'fangbing@startdt.com,fengjunyuan@startdt.com',
  '5': 'helong@startdt.com'
};
const DEFAULT_USER = 'zhouxiaojiang@startdt.com';

const transporter = nodemailer.createTransport({
  host: 'smtp.126.com',
  secure: true, 
  auth: {
    user: 'fe_monitor_center@126.com', 
    pass: 'fe28121848' 
  },
  transport: "SMTP"
});

function sendMail(app, subject, text) {
  transporter.sendMail({
    from: '"【前端监控中心】" <fe_monitor_center@126.com>', // sender address
    to: DEFAULT_USER || USER_LIST[app] || DEFAULT_USER, // list of receivers
    subject: subject, // Subject line
    text: apiMonitorTemplate,
    html: apiMonitorTemplate
  }, (err, info) => {
    if (err) {
      log('[mailerror]' + err, 'error')
    }
  });
}

// sendMail('zhouxiaojiang@startdt.com', '【接口异常提醒】', 'Hello world?')
module.exports = sendMail
