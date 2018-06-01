## 前端监控中心

----
#### 1、安装使用
```
npm install --save fe-api-monitor-center
```
###  监控 拦截器中应用 demo
```
function monitor(xhr, type) {
  // 2000 系统错误，看各自的系统实际设定
  const monitorCodes = [2000]
  let res = xhr.data
  let config = xhr.config
  if (location.href.indexOf('.com') === -1) {
    // monitor = function monitor () {}
    return
  }
  if (typeof res === 'object' && res.codeNum && monitorCodes.indexOf(res.codeNum) === -1) {
    return
  }
  feMonitorCenter('apiMonitor', {
    url: config.url,
    param: config.requestMethod === 'get' ? config.params : config.data,
    response: JSON.stringify(res),
    desc: xhr.message || '接口响应异常',
    app: '官网控制台项目',
    method: config.requestMethod || 'post',
    group: 4,
    type: type,
    href: location.href
  }, {
    frequency: 1, // 接收频率
    noSendMail: false, // 不发送邮件
    noInsertDb: false // 不插入数据库
  })
}
```


#### 1、接口异常监控
    收集各个业务方接口的报错信息，包含超时以及系统异常等，快速发现问题，及时响应
- 业务方
- 应用
- 接口地址
- 错误原因
- 服务端相应的数据
- 前端传递的参数（待定）


#### 2、js报错搜集
    利用window.onerror 和 try catch将搜集页面的js报错，便于前端了解系统的代码质量
- 业务方
- 应用
- 页面地址
- 错误日志
- 错误的行、列（待定）

#### 3、埋点（？）
    统计各种行为产生的pv,uv，便于产品决策
- 业务方
- 应用
- 页面
- 哪种行为
- +1


#### 4、页面性能统计（？）
    基于performance统计前端页面一些关键信息的耗时，便于前端横向对比各个系统的代码性能
- domReady时间
- onload时间
- 各种cdn资源（js、img、css）的相应时间
