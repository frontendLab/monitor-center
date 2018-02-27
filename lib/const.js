module.exports = {
  // api_monitor表的type字段对应的含义
  apiMonitorErrorType: {
    "0": '未知错误',
    "1": '服务端系统错误',
    "2": '用户非正常操作',
    "3": '接口超时',
    "4": '返回非json字段',
  },
  // api_monitor表的字段
  apiMonitorKeys: ['url', 'desc', 'response', 'param', 'app', 'ua', 'referer', 'date', 'others', 'type']
}