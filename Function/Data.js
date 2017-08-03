//-----------------------------------------------------= DB函数 =-----------------------------------------
function DB(str) {

  var rtnValue = str.slice(0,str.search(/[^=]=[^=]/)+1);
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
    var obj = ucctojs(rtnValue);

    //监听状态的回调函数
    DBrequest.onreadystatechange = function(){
      if(DBrequest.readyState===4){
        if(DBrequest.status===200){
          console.log('readyState:4 status:200 OK \najax Post success');
          DBresponse = DBrequest.responseText;
          //JSON化
          DBresponse = JSON.parse(DBresponse);
          obj.varType = "JSON";
          obj.varContent = DBresponse;
        }else {
          console.error(DBrequest.statusText);
        }
      }
    };

    DBrequest.open('POST', 'http://localhost/UCC_Demo_SPA/Function/DB.php', false); //同步加载 保证串行执行
    DBrequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // 发送HTTP请求
    DBrequest.send(postStr);
    console.log('...DBMysql Finished');
  }
}


//-----------------------------------------------------= BindingDataTo函数 =-----------------------------------------
function BindingDataTo(str) {
  var rtnValue = str.slice(0,str.search(/[^=]=[^=]/)+1);
  str = str.slice(str.search(/[^=]=[^=]/)+2,str.length);

  var rtnObj = ucctojs(rtnValue);
  var dataObj = ucctojs("dbChart");

  //记录
  var i = 0;
  var iMax = dataObj.varContent.length;
  //字段名
  var j = 0;
  var jMax = (Object.getOwnPropertyNames(dataObj.varContent[0]).length)/2;

  switch (rtnObj.getAttribute("ucctype")) {
    case 'Report' : BindingDataToReport(); break;
    case 'Chart' : BindingDataToChart(); break;

      break;
    default:
  }

  function BindingDataToReport() {
    console.log('BindingDataToReport Start...');

    //清空缓存
    rtnObj.innerText = null;
    //加载字段名
    var nowRow = rtnObj.insertRow(0);
    while (j<jMax) {
      nowRow.insertCell(j).innerText = Object.getOwnPropertyNames(dataObj.varContent[0])[jMax+j];
      j++;
    }

    //加载数据
    j = 0;
    while (i<iMax) {
      nowRow = rtnObj.insertRow(i+1);
      while (j<jMax) {
        nowRow.insertCell(j).innerText = dataObj.varContent[i][j];
        j++;
      }
      j=0;
      i++;
    }
    console.log('...BindingDataToReport Finished');

  }

  function BindingDataToChart() {
    console.log('BindingDataToChart Start...');

    var chartObj = echarts.init(rtnObj);//main是div的
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
