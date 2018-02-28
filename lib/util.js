const dateFormat = require('dateformat');
const imgdata = [
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00,
0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00,
0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44, 0x01, 0x00, 0x3b
]
const imgbuf = new Buffer(imgdata)

module.exports = {
  imgbuf,
  decodeData (data) {
    for (var i in data) {
      data[i] = decodeURIComponent(data[i]) 
    }
    return data
  },
  getRequestBaseInfo(ctx) {
    let header = ctx.request.header
    return {
      ua: header['user-agent'],
      date: dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"),
      referer: header['referer'] || ''
    }
  },
  sub(str, data) {
    return str.replace(/{(.*?)}/igm, function($, $1) {
      return data[$1] ? data[$1] : '-';
    });
  }
}