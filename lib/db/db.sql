

-- 建表：api_monitor
CREATE TABLE `api_monitor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(500) DEFAULT NULL COMMENT '接口地址',
  `response` text COMMENT '服务端响应数据',
  `param` text COMMENT '前端传递参数',
  `type` int(5) DEFAULT NULL COMMENT '错误类型：0：未知错误；1、数据响应非成功接口；2、ajax触发error；4、返回非json字段（抛java异常代码）',
  `desc` text COMMENT '错误详细描述',
  `group` int(20) DEFAULT NULL COMMENT '部门：1、无人零售；2、智能零售；3、魔方大数据；4、官网中台；5、安卓app',
  `app` varchar(1000) DEFAULT NULL COMMENT '应用名称：例如（酒窖项目）',
  `ua` varchar(500) DEFAULT NULL COMMENT '用户的ua信息',
  `href` varchar(1000) DEFAULT NULL COMMENT '调用接口的页面地址',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  `others` text COMMENT '额外想记录的数据',
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '记录状态：1、有效的；0、无效的',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=261 DEFAULT CHARSET=utf8 COMMENT='异常接口监控表';



