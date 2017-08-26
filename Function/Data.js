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
  var DataObj = ucctojs("dbChart");

  //记录
  var i = 0;
  var iMax = DataObj.varContent.length;
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
        nowRow.insertCell(j).innerText = DataObj.varContent[i][FieldName[j]];
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
      option.xAxis.data[i] = DataObj.varContent[i][0];
      option.series[0].data[i] = DataObj.varContent[i]['费用']
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
  push(RtnObj)
}

function GetFieldValue(Str) {
  var RtnObj = ucctojs(Str.slice(0,DividePoint(Str,'=')));
  var DataObj = ucctojs(Str.slice(DividePoint(Str,'=')+1,DividePoint(Str,',')));
  Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  var Lmt = ucctojs(Str.slice(0,DividePoint(Str,',')));
  var FieldName = ucctojs(Str.slice(DividePoint(Str,',')+1,Str.length));
  //console.log(RtnObj,"\n",DataObj,"\n",Lmt,"\n",FieldName);
  var i = 0;
  var OutputObj = JSON.parse(JSON.stringify(DataObj));


  if (Lmt.varType==="number") {
    if (Lmt.varContent<=DataObj.varContent.length) {
      OutputObj.varContent[0] = OutputObj.varContent[Lmt.varContent];
      OutputObj.varContent.length = 1;
    }
  } else if (DividePoint(Lmt.varContent,"=")!==-1) {
    var LmtFieldObj = ucctojs(Lmt.varContent.slice(0,DividePoint(Lmt.varContent,'=')));
    var LmtValueObj = ucctojs(Lmt.varContent.slice(DividePoint(Lmt.varContent,'=')+1,Lmt.varContent.length));
    while (i<DataObj.varContent.length) {
      console.log();
      if (DataObj.varContent[i][LmtFieldObj.varContent]===LmtValueObj.varContent) {
        OutputObj.varContent[0] = OutputObj.varContent[i];
        OutputObj.varContent.length = 1;
      }
      i++;
    }
  }

  if (RtnObj.varType==="toolId") {
    if (RtnObj.getAttribute("ucctype")==="Report") {
      RtnObj.innerText = null;
      //加载字段名
      i = 0;
      var nowRow = RtnObj.insertRow(0);
      nowRow.insertCell(0).innerText = FieldName.varContent;
      //加载数据
      while (i<OutputObj.varContent.length) {
        nowRow = RtnObj.insertRow(i+1);
        nowRow.insertCell(0).innerText = OutputObj.varContent[i][FieldName.varContent];
        i++;
      }
    }
  } else {
    RtnObj.varContent = OutputObj.varContent;
  }
}

//-----------------------------------------------------= Math =-----------------------------------------
function math(Str){
    Str += ',';
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    var sonObjArray = new Array();
    var i=0;
    while (DividePoint(Str,',')!==-1) {
        if(Str.slice(0,DividePoint(Str,','))==""){
            break;
        }
      sonObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
  if (sonObjArray.length<2) {
      RtnObj.varContent = "";
  }else if(sonObjArray.length>=2&&typeof(sonObjArray[1].varContent)=='number'){
   switch (sonObjArray[0].varContent.toLowerCase()) {
       case 'abs':
           RtnObj.varContent = Math.abs(sonObjArray[1].varContent);
           break;
       case 'atn':
           RtnObj.varContent = Math.atan(sonObjArray[1].varContent);
           break;
       case 'cos':
           RtnObj.varContent = Math.cos(sonObjArray[1].varContent);
           break;
       case 'exp':
           RtnObj.varContent = Math.exp(sonObjArray[1].varContent);
           break;
       case 'int':
           RtnObj.varContent = Math.floor(sonObjArray[1].varContent);
           break;
       case 'log':
           RtnObj.varContent = Math.log(sonObjArray[1].varContent);
           break;
       case 'sgn':
            if(Number(sonObjArray[1].varContent)<0){
                RtnObj.varContent = -1;
            }
            else if(Number(sonObjArray[1].varContent)>0){
                RtnObj.varContent = 1;
            }
            else{
                RtnObj.varContent = 0;
            }
           break;
       case 'sqr':
           RtnObj.varContent = Math.sqrt(sonObjArray[1].varContent);
           break;
       case 'sin':
           RtnObj.varContent = Math.sin(sonObjArray[1].varContent);
           break;
       case 'tan':
           RtnObj.varContent = Math.tan(sonObjArray[1].varContent);
           break;
       case 'round':
           if(sonObjArray.length==2){
               RtnObj.varContent = Math.round(sonObjArray[1].varContent);
           }
           else if(sonObjArray.length>2&&typeof(sonObjArray[2].varContent)=='number'){
               RtnObj.varContent = Math.round(sonObjArray[1].varContent * Math.pow(10,sonObjArray[2].varContent)) / Math.pow(10,sonObjArray[2].varContent);
           }
           else{
                RtnObj.varContent = Math.round(sonObjArray[1].varContent);
           }
           break;
       case 'max':
           RtnObj.varContent=Number.MIN_VALUE ;
           for(var i =1;i<sonObjArray.length-1;i++){
               if(typeof(sonObjArray[i].varContent)!='number'){
                   continue;
               }
               RtnObj.varContent = Math.max(sonObjArray[i].varContent,RtnObj.varContent);
           }
           break;
       case 'min':
           RtnObj.varContent=Number.MAX_VALUE ;
           for(var i =1;i<sonObjArray.length-1;i++){
               if(typeof(sonObjArray[i].varContent)!='number'){
                   continue;
               }
               RtnObj.varContent = Math.min(sonObjArray[i].varContent,RtnObj.varContent);
           }
           break;
       case 'average':
           var temp = 0;
               for(var i =1;i<sonObjArray.length;i++){
                   if(typeof(sonObjArray[i].varContent)!='number'){
                       continue;
                   }
                  temp+= sonObjArray[i].varContent;
               }
               RtnObj.varContent = temp/(sonObjArray.length-1);
           break;
    //    case 'ceiling':
    //        if(sonObjArray.length==2){
    //            RtnObj.varContent = Math.ceil(sonObjArray[1].varContent);
    //        }
    //        else if(sonObjArray.length>2&&typeof(sonObjArray[2].varContent)=='number'){
    //            onObjArray[1].varContent + sonObjArray[2].varContent
    //            RtnObj.varContent = Math.round(sonObjArray[1].varContent * Math.pow(10,sonObjArray[2].varContent)) / Math.pow(10,sonObjArray[2].varContent);
    //        }
    //        else{
    //             RtnObj.varContent = Math.round(sonObjArray[1].varContent);
    //        }
    //        break;

       default:
         RtnObj.varContent = "";
   }
  }
  else{
     RtnObj.varContent = "";
  }


    push(RtnObj);

}

function GetRandomNumber(Str){
        Str += ',';
        var RtnStr = Str.slice(0,DividePoint(Str,'='));
        var RtnObj = ucctojs(RtnStr);
        Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
        var sonObjArray = new Array();
        var i=0;
        while (DividePoint(Str,',')!==-1) {
            if(Str.slice(0,DividePoint(Str,','))==""){
                break;
            }
          sonObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
          i++;
          Str = Str.slice(DividePoint(Str,',')+1,Str.length);
      }

      if (sonObjArray.length==0) {
          RtnObj.varContent = "";
      }else if(sonObjArray.length>=1&&typeof(sonObjArray[0].varContent)=='number') {
          RtnObj.varContent = parseInt(Math.random()*sonObjArray[0].varContent,10)+1;
      }else{
            RtnObj.varContent = "";
      }
        push(RtnObj);

      }
