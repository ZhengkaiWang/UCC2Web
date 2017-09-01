//-----------------------------------------------------= GetCursorPos =-----------------------------------------
function GetCursorPos(Str) {

  if (DividePoint(Str,'=')!==-1) {
    var RightStr = Str.slice(DividePoint(Str,'=')+1,Str.length);
    var RtnObj = ucctojs(Str.slice(0,DividePoint(Str,'=')));
    if(RightStr==="x"){
      RtnObj.varContent = event.clientX;
    }else if (RightStr==="y") {
      RtnObj.varContent = event.clientY;
    }else if (RightStr==="/") {
      RtnObj.varContent = event.clientX + "/" + event.clientY;
    }else {
      //throwerror();
      alert("GetCursorPos()代码写错了= =")
    }
  } else {
    var RtnObj = ucctojs(Str);
    RtnObj.varContent = event.clientX + "/" + event.clientY;
  }
  push(RtnObj);
}
//-----------------------------------------------------= ColorBrowse =-----------------------------------------
function ColorBrowse(Str) {
  var Obj = window.event.target;
  $(Obj).colpick({
      layout:'full',
                  //布局样式，'full'(RGB, HEX, and HSB fields),'rgbhex' (no HSB fields) and hex(no HSB, no rgb)
                  //三种，默认为full，一般使用hex即可。
      submit:true,
                  //是否显示OK提交按钮，如果为true显示选择器上显示实时值的框会分半，一半显示下边color属性旧颜色，
                  // 一半显示实时新颜色。
      colorScheme:'light',
                  //配色方案，有light和dark可选，dark有点黑不太合适。默认为light。
      color:'0066CC',
                  //默认显示颜色，程序有自己默认的值，官网说法是11ff00。前面的#可写可不写。
      showEvent:'click',
                  //触发事件，默认为click。
      onChange:function(hsb,hex,rgb,el,bySetColor) {
                  //颜色改变时触发的函数，前面三个是改变着的颜色的实时值。el为调用colpick函数的DOM对象，
                  // 比如默认例子中的input框。最后一个，如果为true表示onChange回调函数是通过colpickSetColor函数
                  // (看下边的keyup事件)触发的，而不是由用户直接操作选择器改变颜色值触发。
          if(!bySetColor) $(el).val(hex);
                  //不是colpickSetColor函数触发的，则为用户通过选择器改变颜色触发的，实时显示到input框。想把实时
                  // 值显示到其他地方，找到相应节点即可。
      }
  }).keyup(function(){
      $(this).colpickSetColor(this.value);
                  //colpickSetColor是插件为jquery扩充的函数，可用来设置选择器的颜色，就是手动更改颜色值时下边的
                  // 选择器的颜色值跟着变
  })
  var RtnObj = ucctojs(Str);
  RtnObj.varContent = Obj.value;
  push(RtnObj);
  console.log(RtnObj);
}
//-----------------------------------------------------= Clipboard =-----------------------------------------
function Clipboard(Str) {
  //Chrome 暂不支持对剪切板的访问
}
//-----------------------------------------------------= Exit =-----------------------------------------
function Exit() {
  //Chrome Safari Firefox不支持 只能关闭js自己打开的窗口
  // 此处通过清空窗口来间接实现
  var Form = ucctojs("Me");
  var Body = Form.parentNode;
  Body.remove(Form);
}

function GetIP(Str) {
  var Obj = ucctojs(Str);
  Obj.varContent = '127.0.0.1';
  push(Obj);
}
//-----------------------------------------------------= GetDateTime =-----------------------------------------
function GetDateTime(Str) {
  var DateObj = new Date();
  if (DividePoint(Str,',')!==-1) {
    var RtnObj = ucctojs(Str.slice(0,DividePoint(Str,'=')));
    var Which = Str.slice(DividePoint(Str,'=')+1,DividePoint(Str,','));
    switch (Which) {
      case "YEAR":
      case "MONTH":
      case "DAY":
      case "HOURS":
      case "MINUTES":
      case "SECONDS":
      case "WEEKDAY":
      break;
      default:

    }
  } else if (DividePoint(Str,'=')!==-1) {
    var RtnObj = ucctojs(Str.slice(0,DividePoint(Str,'=')));
    RtnObj.varContent = '';
    if (Str.search(/YYYY-MM-DD/)!==-1) { RtnObj.varContent = DateObj.getFullYear()+'-'+DateObj.getMonth()+'-'+DateObj.getDay();}
    if (Str.search(/HH:mm:ss/)!==-1) { RtnObj.varContent += ' '+DateObj.getHours()+':'+DateObj.getMinutes()+':'+DateObj.getSeconds();}
  } else {
    var RtnObj = ucctojs(Str);
    RtnObj.varContent = DateObj.getFullYear()+'-'+DateObj.getMonth()+'-'+DateObj.getDay()+' '+DateObj.getHours()+':'+DateObj.getMinutes()+':'+DateObj.getSeconds();
  }
  DateObj = null;
}
function GetDateDiff(Str){


    Str += ',';
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    var sonObjArray = new Array();
    var i=0;
    while (DividePoint(Str,',')!==-1) {
        if(Str.slice(0,DividePoint(Str,','))==""){
            console.log(sonObjArray.length);
            break;
        }
      sonObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }

  if (sonObjArray.length<3) {
      RtnObj.varContent = "";
  }else if(sonObjArray.length>=3) {
      var dateBegin=new Date(sonObjArray[1].varContent);  //开始时间
      var dateEnd=new Date(sonObjArray[2].varContent);    //结束时间
      var dateDiff =  dateEnd.getTime() - dateBegin.getTime();
      var minutes = 1000 * 60;
      var hours = minutes * 60;
      var days = hours * 24;
      var years = days * 365;
       switch (sonObjArray[0].varContent.toLowerCase()) {
           case 'yyyy':
                RtnObj.varContent = dateEnd.getFullYear()-dateBegin.getFullYear();
                break;
           case 'q':
                RtnObj.varContent = Math.ceil(((dateEnd.getFullYear()-dateBegin.getFullYear())*12+dateEnd.getMonth()-dateBegin.getMonth())/3);
                break;
           case 'm':
                RtnObj.varContent = (dateEnd.getFullYear()-dateBegin.getFullYear())*12+(dateEnd.getMonth()-dateBegin.getMonth());
                break;
        //    case 'y':
        //         break;

           case 'w':
               RtnObj.varContent =parseInt(dateDiff/days);
               if(dateDiff/days>0&&dateEnd.getHours()<=dateBegin.getHours()){
                   RtnObj.varContent=RtnObj.varContent+1;
               }
                RtnObj.varContent =parseInt(RtnObj.varContent/7);
                break;
           case 'd':
                RtnObj.varContent =parseInt(dateDiff/days);
                if(dateDiff/days>0&&dateEnd.getHours()<=dateBegin.getHours()){
                    RtnObj.varContent=RtnObj.varContent+1;
                }
                break;
        //    case 'ww':
        //         break;
           case 'h':
                RtnObj.varContent = parseInt(dateDiff/hours);
                if(dateDiff/hours>0&&dateEnd.getMinutes()<=dateBegin.getMinutes()){
                    RtnObj.varContent=RtnObj.varContent+1;
                }
                break;
           case 'n':
                RtnObj.varContent = parseInt(dateDiff/minutes);
                if(dateDiff/minutes>0&&dateEnd.getSeconds()<=dateBegin.getSeconds()){
                    RtnObj.varContent=RtnObj.varContent+1;
                }
                break;
           case 's':
                RtnObj.varContent = parseInt(dateDiff/1000);
                break;
           default:
                RtnObj.varContent = "";
       }
  }else{
        RtnObj.varContent = "";
  }
    push(RtnObj);
}
