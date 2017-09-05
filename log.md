# Plan  
- Standard  
	- 健壮 调试
		- [ ] UCC语法错误提示
		- [ ] UCC双转义符问题
		- [ ] Web错误信息抛出 warn error fatal  
	- [x] HTML中所有引号加转义符
		- 根据引号起止判定 逗号做确认  
	-加载
		- [ ] Tool加载？异步加载  
- Function  
	- [x]	Set函数重写,多参数实现    
	- [ ] action参数实现
		- 参考计数器思想 实现局部作用域+重用  
	- [ ]Divide情况未考虑全

## 2017/8/3  
	- 服务器端  
		- 完成php及apache环境搭建D:/amp  
			- php 5.3.5 VC6  
			- apache 2.2 虚拟主机指向E:/UCC2H5/www 公司服务器自带  
			- port 开放8181端口测试  			
			- 备注 E盘apache24测试 全部搭建成功可删除
		- 文件目录   	
	- 完成repo搭建   

## 8/4
- Standard
	- 变量命名规范添加进README
- Function
	- Divide函数实现
		- 未考虑"'"的情况

## 8/5
-	Standard
	- 单双引号转义符已加
- Function
	- Divide->DividePoint 更加符合函数特点
	- Set函数完成

## 8/6
- Standard
	- Set作为函数书写规范
  - LinkString函数重写完成

- Function
	- ShowHideLayer函数重写完成 Demo完成
	- Clear函数完成 Demo完成

## 8/7
- Function
	- ShowHideLayer函数优化
		- 遗留 ucctype
	- SetClear优化 Demo优化
	- IF完成
	- ColorBrowse 完成
		- 添加colpock.css colpick.js
		- 下次完善
	- Clipboard函数 chrome不支持
	- Exit函数完成
		- 清空内容 模拟退出
	- GetCursorPos函数优化完成

## 8/8
- Function
	-	ColorBrowse优化
	- GetDateTime函数实现
	- ？GetDataTime改名

	-Function
  -HideButton函数完成
  -ShowButton函数完成


## 8/9
-	Function
	- IF函数存在未完成点 LIKE REG

## 8/10
-	Function
	-HideControl函数完成(用Switch语句，局部变量type表示ucctype)
  -ShowControl函数完成
	- Case
		- eval函数不能识别转义
		- 修正了ucctojs只识别单引号的问题
		- eval？的代替版本

## 8/11
-	Function
	-	Translucence函数还未完成(子元素继承此属性)
## 8/14

## 8/15
-   Function
    -InsertString函数完成
	-GetPartOfString函数完成

-	Function
  -	GetAsc函数完成
	-	GetChr函数完成
	-	Replace函数

## 8/15
- Function
	- Get函数完成
	- New函数80%
	- ini？

## 8/16
-  Function
  -	FindString函数完成
	-	LengthOFString函数完成
	- New完成
	- ShowHideScreen函数完成

## 8/18
-	Function
	-	Clone函数完成
	-	DB BindingDataTo函数优化
	- 添加v1 v2

## 8/21
- Function
	- Calc函数完成（两种情况为考虑）

## 8/22
- Function
 	- GetFieldValue
		- !!!Basic函数 number修改 类型自动转换
		- !!!Basic函数 '@abc'未解决
		- !!!Basic函数 数字进去怎么办
	- main函数实现
- Standard
	- @Var实现

## 8/23
- Bug修正
- number处理优化
	- ？？其他呢
## 8/24
- Function
	- math函数完成90%（between,ceiling(ucc有bug))
	- GetRandomNumber函数完成
  - ini优化

	- GetRandomNumber函数完成
## 8/25
- Function
    - GetFileNameFromURI
	- GetDateDiff
## 8/26
- Function
    - FillString函数完成
    - GetDateDiff
	- ini优化
	- ini函数 初始化变量 均看成字符串？？

## 8/28
- Function
	- ExitAction 通过抛出error实现
	- MsgBox 通过alert实现
	- init修改名称
	- RunAction实现

	- @@？ @@ 外部引用 不经过预处理直接拉过来 /RunAction不一样
	- 区分大小写(函数、控件名均不区分)？？
	- Button（id1，di2）.value？？(set:id1.v1,id2.v1无效 set:type(id1,id2).v1有效)
	- var.value需要添加
	- Forecolor?? 只翻译了黑白色
	- main? ID Action大小写问题
	- [main] or fun_main

## 9/1
	- 成功读取数据
	- GetIP 127.0.0.1
	- GetRecord
	- ShwoHideButton 修改
	- SetOnTop？？
	- Move??
	- For??
	- 大小写混淆？？
	- SetOnTop完成

## 9/3
 - 解决引号问题 重写Runaction
 - html 中 Button(L新店开业Eng,L主题活动Eng,,L信息查询Eng,L服务设施Eng).Forecolor =0 去掉一个,
 - [main] fun_main
 - btn Btn统一

## 9/4
	- 常量的处理 ConstantV
	- @var @ID 的简化
	- GetFieldValue 优化？？？？？？？？？？？？？？
	- GetFieldValue 修正
	- ucctojs修正
	
