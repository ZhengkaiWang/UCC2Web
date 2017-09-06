- 函数名重载问题 划分规范
- 触摸屏的生产力和妥协原则
- 函数规范
  - SavePicture
  - GetDataAdd
  - ADD
  - New（示例命名问题） 函数示例New:varID=TypeName,ID,Title,Container
  - 括号的用法标准（优化执行效率vs用户体验 var(ID1,ID2)）
  - var的函数 组件能不能用(函数描述)
- 界限划分
  - UCC至少要能检出
    - 基本语法错误 语句形式不符合函数要求
    - 变量 使用未声明的变量、未出现的ID等
    - 变量与函数要求相吻合

- 思考
  - 实例化问题
    - B/S的实例化问题 不同用户操作服务器??
    - Clone deep copy
    - 定位
      - 软件？编程？

- bug
  - Decode、Encode函数用法不是特别清楚(与网上的base64编码解码结果不同)??
  - Format函数语法：Format:var = '23','0000',但是在ucc中，第一个参数应该不加引号才会出现正确结果，这应该属于一个bug
  - Exit退出后会留下runtime框 下次运行不覆盖
- issue
  - Calc: 取模运算mod->%(??)
  - ucc里面"123"=123
-------------------------------------------------------------------------------
- 8.25
- issue
  - Standard  DB:db数据集=Access,'@txtAccessFile','',SQL @txtSQL.text ; sql语句中加入变量从前缀改为参数
  - menu重绘

- GetFileNameFromURI 重写？？

- '1'除非直接使用，都会被当作number存储
- Var1=Var2 Var2=Var3 Var3=hh so @Var1=Var2='Var3'
