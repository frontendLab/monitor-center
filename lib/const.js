module.exports = {
  dbConfigDev: {
    host: 'localhost',
    user: 'root',
    password: 'bf',
    database: 'monitor_center'
  },
  dbConfigOnline: {
    // 地址 rm-bp162makjsew841oumo.mysql.rds.aliyuncs.com     登陆用户名 api_monitor  密码 Start@19911^$0!
    host: 'rm-bp162makjsew841oumo.mysql.rds.aliyuncs.com',
    user: 'api_monitor',
    password: 'Start@19911^$0!',
    database: 'api_monitor'
  },
  // api_monitor表的type字段对应的含义
  apiMonitorErrorType: {
    "0": '未知错误',
    "1": '服务端系统错误',
    "2": '用户非正常操作',
    "3": '接口超时',
    "4": '返回非json字段',
  },
  groupDeveLoperMail: {
    '0': 'fangbing@startdt.com'
  },
  // api_monitor表的字段
  apiMonitorKeys: ['url', 'desc', 'response', 'param', 'group', 'app', 'ua', 'href', 'date', 'others', 'type', 'status']
}

/*
CREATE TABLE `api_monitor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(500) DEFAULT NULL COMMENT '接口地址',
  `response` text COMMENT '服务端响应数据',
  `param` text COMMENT '前端传递参数',
  `type` int(5) DEFAULT NULL COMMENT '错误类型：0：未知错误；1、服务端系统错误；2、用户非正常操作导致的错误（例如表单输入不合法字段前端未过滤掉，服务端返回的错误）；3：接口超时；4、返回非json字段（抛java异常代码）',
  `desc` text COMMENT '错误详细描述',
  `group` int(20) DEFAULT NULL COMMENT '部门：1、无人零售；2、智能零售；3、魔方大数据；4、官网中台；5、安卓app',
  `app` varchar(1000) DEFAULT NULL COMMENT '应用名称：例如（酒窖项目）',
  `ua` varchar(500) DEFAULT NULL COMMENT '用户的ua信息',
  `referer` varchar(1000) DEFAULT NULL COMMENT '接口的referer信息',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  `others` text COMMENT '额外想记录的数据',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8 COMMENT='异常接口监控表';
*/