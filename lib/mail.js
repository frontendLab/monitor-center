/**
 * 日志
 */
const nodemailer = require('nodemailer')
const log = require('./log')
const util = require('./util')

const USER_LIST = {
  '1': 'hanjiaping@startdt.com,zhouxiaohao@startdt.com',
  '2': 'laixuejiao@startdt.com,huangzhenhua@startdt.com',
  '3': 'zhuzheng@startdt.com,xuhuihui@startdt.com',
  '4': 'fangbing@startdt.com,fengjunyuan@startdt.com',
  '5': 'helong@startdt.com'
}
const DEFAULT_USER = 'zhouxiaojiang@startdt.com'
// 任务列表
let taskQueue = []
let userMail = 'zhouxiaojiang@startdt.com'

// const transporter = nodemailer.createTransport({
//   host: 'smtp.126.com',
//   secure: true,
//   auth: {
//     user: 'fe_monitor_center@126.com',
//     pass: 'fe28121848' 
//   },
//   transport: "SMTP"
// });

// 网易邮箱改成阿里云邮箱，网易邮箱性能差比较差（发送时间长、短时间频繁发送拒绝服务）
const transporter = nodemailer.createTransport({
  host: 'smtp.aliyun.com',
  secure: true,
  auth: {
    user: userMail,
    pass: 'fe28121848' 
  },
  transport: "SMTP"
})

// 网易邮箱改成阿里云邮箱，网易邮箱性能差比较差（发送时间长、短时间频繁发送拒绝服务）
const transporter = nodemailer.createTransport({
  host: 'smtp.mxhichina.com', // 'smtp.aliyun.com',
  secure: true,
  auth: {
    user: 'zhouxiaojiang@startdt.com',
    pass: atob('WnhqMDU1ODgz')
  },
  port: 465,
  transport: "SMTP"
})

function doSendMail(info) {
  // 发邮件限流
  if (info) {
    taskQueue.push(info)
    if (taskQueue.length > 1) {
      return
    }
  }
  transporter.sendMail({
    from: `"【前端监控中心】" <${userMail}>`, // sender address
    to: taskQueue[0].to, // DEFAULT_USER || USER_LIST[app] || DEFAULT_USER, // list of receivers
    subject: taskQueue[0].subject, // Subject line
    text: taskQueue[0].text,
    html: taskQueue[0].text
  }, (err, info) => {
    if(taskQueue.length) {
      setTimeout(() => {
        taskQueue.shift()
        if (taskQueue.length) {
          doSendMail()
        }
      }, Math.floor(Math.random() * 1000))
		}
    if (err) {
      log('[mailerror]' + err, 'error')
    }
  })
}

// sendMail
function sendMail(to, subject, text) {
  doSendMail({
    to,
    subject,
    text
  })
}

// sendMail('zhouxiaojiang@startdt.com', '【接口异常提醒】', 'Hello world?')
module.exports = sendMail
