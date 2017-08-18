//-----------------------------------------------------= DB函数 =-----------------------------------------
function DB(str) {

  var RtnValue = str.slice(0,str.search(/[^=]=[^=]/)+1);
  str = str.slice(str.search(/[^=]=[^=]/)+2,str.length);
  var typeStr = str.slice(0,str.search(/,/));
  str = str.slice(str.search(/,/)+1,str.length);

  switch (typeStr) {
    case 'Mysql' : DBMysql(); break;
    case 'Access' : DBAccess(); break;
    case 'Excel' : DBExcel(); break;
    case 'SqlLite' : DBSqlLite(); break;

      break;
    default:

  }

  function DBMysql() {
    console.log('DBMysql Start...');
    var serverNameStr = str.slice(0,str.search(/,/));
    str = str.slice(str.search(/,/)+1,str.length);
    var DBNameStr = str.slice(0,str.search(/,/));
    str = str.slice(str.search(/,/)+1,str.length);
    var userNameStr = str.slice(0,str.search(/,/));
    str = str.slice(str.search(/,/)+1,str.length);
    var passwordStr = str.slice(0,str.search(/,/));
    str = str.slice(str.search(/,/)+1,str.length);
    var SQLStr = str.slice(str.search(/SQL/)+4, str.length);

    var typePostStr = "typeStr="+typeStr;
    var serverNamePostStr = "serverName="+serverNameStr;
    var DBNamePostStr = "DBName="+DBNameStr;
    var userNamePostStr = "userName="+userNameStr;
    var passwordPostStr = "passwordStr="+passwordStr;
    var SQLPostStr = "SQLStr="+SQLStr;

    var postStr = typePostStr+'&'+serverNamePostStr+'&'+DBNamePostStr+'&'+userNamePostStr+'&'+passwordPostStr+'&'+SQLPostStr;

    //ajax
    var DBrequest = new XMLHttpRequest();
    var DBresponse;
    var Obj = ucctojs(RtnValue);

    //监听状态的回调函数
    DBrequest.onreadystatechange = function(){
      if(DBrequest.readyState===4){
        if(DBrequest.status===200){
          console.log('readyState:4 status:200 OK \najax Post success');
          DBresponse = DBrequest.responseText;
          //JSON化
          DBresponse = JSON.parse(DBresponse);
          Obj.varType = "JSON";
          Obj.varContent = DBresponse;
        }else {
          console.error(DBrequest.statusText);
        }
      }
    };

    DBrequest.open('POST', 'http://127.0.0.1:8033/Function/DB.php', false); //同步加载 保证串行执行
    DBrequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // 发送HTTP请求
    DBrequest.send(postStr);
    console.log('...DBMysql Finished');
  };

  function DBAccess() {

  };
  function DBExcel() {

  };
  function DBSqlLite() {

  };
}

//-----------------------------------------------------= BindingDataTo函数 =-----------------------------------------
function BindingDataTo(str) {
  var RtnValue = str.slice(0,str.search(/[^=]=[^=]/)+1);
  str = str.slice(str.search(/[^=]=[^=]/)+2,str.length);

  var RtnObj = ucctojs(RtnValue);
  var dataObj = ucctojs("dbChart");

  //记录
  var i = 0;
  var iMax = dataObj.varContent.length;
  //字段名
  var j = 0;
  var FieldName = Array();
  FieldName[0] = "姓名"
  FieldName[1] = "工号"
  FieldName[2] = "午餐"
  FieldName[3] = "费用"
  var jMax = 4;

  switch (RtnObj.getAttribute("ucctype")) {
    case 'Report' : BindingDataToReport(); break;
    case 'Chart' : BindingDataToChart(); break;

      break;
    default:
  }

  function BindingDataToReport() {
    console.log('BindingDataToReport Start...');

    //清空缓存
    RtnObj.innerText = null;
    //加载字段名
    var nowRow = RtnObj.insertRow(0);
    while (j<jMax) {
      nowRow.insertCell(j).innerText = FieldName[j];
      j++;
    }

    //加载数据
    j = 0;
    while (i<iMax) {
      nowRow = RtnObj.insertRow(i+1);
      while (j<jMax) {
        nowRow.insertCell(j).innerText = dataObj.varContent[i][FieldName[j]];
        j++;
      }
      j=0;
      i++;
    }
    console.log('...BindingDataToReport Finished');
  }

  function BindingDataToChart() {
    console.log('BindingDataToChart Start...');

    var chartObj = echarts.init(RtnObj);//main是div的
    var option = {
        //图的标题
             title: {
                 text: 'SuperDemo'
             },
             //图例
             legend: {
                 data:[]
             },
             //横坐标
             xAxis: {
                 data: []
             },
             //纵坐标
             yAxis: {},
             //数据
             series: [
                 //第一条数据，name名称，type:类型
                 {
                 name: '',
                 type: 'line',
                 //step:true,
                 label : {normal:{show: true}},//显示数字
                 data: []
             },
         {
             name: '',
             type: 'bar',
             label : {normal:{show: true}},
             data: []
         }]
         };

    option.series[0].name = '费用';
    option.legend.data[0] = '费用';

    //添加横坐标
    while (i<iMax) {
      option.xAxis.data[i] = dataObj.varContent[i][0];
      option.series[0].data[i] = dataObj.varContent[i]['费用']
      i++;
    }
    chartObj.setOption(option);
    console.log('...BindingDataToChart Finished');
  }
}

//-----------------------------------------------------= Cal =-----------------------------------------
function Calc(Str) {
  var RtnObj = ucctojs(Str.slice(0,DividePoint(Str,'=')));
  var RightStr = Str.slice(DividePoint(Str,'=')+1,Str.length);
  var ExeRightStr = RightStr.replace(/\w+[0-9]\w*/g,function (word) {
    return "ucctojs('"+word+"').varContent";
  })
  RtnObj.varContent = eval(ExeRightStr);
  console.log(ExeRightStr);
  push(RtnObj)
}
