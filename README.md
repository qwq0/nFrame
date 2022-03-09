# N Frame
NFrame是一个前端框架(大概)   
NFrame是qwqTown前端使用的框架   
目前正在活跃开发 可能有较大的api变动

NFrame可以简化编码工作
* 接管几乎所有dom有关内容
* 简单的事件处理
* 管道式任务
* 模块化的
* 和NFrame-webtools一起使用 方便的控制UI

使用NFrame的webtools
* 简单的UI编辑器
* 直接将UI转换为js

在NFrame-webtools里编辑ui 然后你可以在任何编辑器编写js以及其他的部分

## 安装
1. 将整个项目clone下来
2. 下载dist中需要的文件

## 文档
在此项目的docs文件夹中
[在线预览](https://me.qwq7.net/nFrame/docs/nframe/)

## 从已有前端项目迁移
NFrame的项目结构可能有别于其他前端结构

从任何其他前端项目(不管是否使用其他前端框架的项目)可能是困难的   
通常可能需要重构整个项目!   
(我承认不可直接迁移是让人失望的)   

注意:从NFrame迁移到其他前端框架也一样是困难的   

## 浏览器兼容性
这可能随时发生变化
|浏览器|兼容性|
|---|---|
|Chrome|74+|
|Firefox|92+|
|Safari on iOS|14.1+|
|Edge(Chromium)|与Chrome一致|
|Edge(Old version)|not support|
|Internet Explorer|not support|

我们使用了一些新特性导致其不支持老版本浏览器   
在未来也不会提供兼容老版本浏览器兼容   
当兼容性出现问题时 我们将考虑优先更新表格而不是修改实现以保证兼容性   

## 与其他JS库的兼容性
很可能不与其他前端框架兼容   
请不要和其他框架同时使用   

可能与一些操作dom的js库不兼容   
部分库可能可以使用兼容性解决方案   

不建议和任何操作dom的js库同时使用!