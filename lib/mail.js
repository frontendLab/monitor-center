const nodemailer = require('nodemailer');
let transporter

function initTransporter(callback) {
  nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
      host: 'smtp.126.com',
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'fe_monitor_center@126.com', // generated ethereal user
        pass: 'fe28121848' // generated ethereal password
      },
      transport: "SMTP"
    });
    callback && callback();
  });
}

function doSend () {
  let mailOptions = {
    from: '"【前端监控中心】" <fe_monitor_center@126.com>', // sender address
    to: 'zhouxiaojiang@startdt.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body 
    // html: '<b>Hello world?</b>' // html body
  }
  transporter.sendMail(mailOptions);
}


function sendMail(to, subject, text) {
  if(!transporter) {
    initTransporter(doSend)
  } else {
    doSend()
  }
}
initTransporter()
module.exports = sendMail
