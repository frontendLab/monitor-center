const dateFormat = require('dateformat');

module.exports = {
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