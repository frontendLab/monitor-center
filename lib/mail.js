/**
 * 日志
 */
const nodemailer = require('nodemailer');
const log = require('./log')

const transporter = nodemailer.createTransport({
  host: 'smtp.126.com',
  secure: true, 
  auth: {
    user: 'fe_monitor_center@126.com', 
    pass: 'fe28121848' 
  },
  transport: "SMTP"
})

function sendMail(to, subject, text) {
  transporter.sendMail({
    from: '"【前端监控中心】" <fe_monitor_center@126.com>', // sender address
    to: 'zhouxiaojiang@startdt.com', // list of receivers
    subject: '【接口异常提醒】', // Subject line
    text: 'Hello world?', // plain text body 
  }, (err, info) => {
    if (err) {
      log('[mailerror]' + err, 'error')
    }
  });
}
sendMail()
// initTransporter()
module.exports = sendMail
