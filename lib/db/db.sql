

-- 建表：api_monitor
CREATE TABLE `api_monitor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(500) DEFAULT NULL COMMENT '接口地址',
  `desc` text COMMENT '错误原因',
  `response` text COMMENT '服务端响应数据',
  `param` text COMMENT '前端传递参数',
  `app` int(20) DEFAULT NULL COMMENT '应用类型：1、无人零售；2智能零售；3、魔方大数据；4官网中台',
  `ua` varchar(500) DEFAULT NULL COMMENT '用户的ua信息',
  `referer` varchar(1000) DEFAULT NULL COMMENT '接口的referer信息',
  `date` varchar(50) DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;



