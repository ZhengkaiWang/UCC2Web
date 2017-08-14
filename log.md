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
<<<<<<< HEAD
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
## 8/11
-	Function
	-Translucence函数还未完成(子元素继承此属性)
## 8/14
-   Function
    -GetAsc函数完成
	-GetChr函数完成
	-Replace函数
    

