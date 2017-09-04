//-----------------------------------------------------= ucctojs函数 =-----------------------------------------
//ucctojs函数 将ucc中的元变量转换为js中可操作对象
// var变量
// varType ucc元变量在js对应变量类型
// varContent ucc元变量在js对应变量
// .*Tmp *Start *End *str即字面意
// .*Obj js操作对象

//先检索单引号，有单引号者
  //有@则取对应组件属性值 现取默认属性 --取不到组件则抛出异常&组件属性非缺省情况处理
  //没有@则作为字符串处理
//没有单引号者
  //若为组件id 则绑定对应DOM对象
  //否则作为全局变量处理

//if (eval("typeof "+varContentTmp+"==='undefined'"))
//探测变量是否存在 注意 变量定义未赋值也返回true（即不存在） 故ini函数中所有全局变量设初值value

//传参方式 Object
//均按一个单引号处理

function ucctojs(str) {
  //console.log(str);

  var varObj = new Object();
  var varType;
  var point = str.length;
  var propty = null;

  //判断是否有 ".属性值"
  if(str.indexOf('.')!==-1){
    point = str.indexOf('.');
    propty = str.slice(point+1,str.length);
  }

  //若有引号
  if(str.search(/'.*'/)!==-1 || str.search(/".*"/)!==-1){
    if (str.search(/'.*'/)!==-1) {
      var quote = "'"
    } else {
      var quote = '"'
    }

    //若有@
    //"@组件id @gblvar"形式
    if(str.search(/@/)!==-1){
      varObj.varType = "@str";
      var varContentTmpStart = str.search(/@/) + 1;
      var varContentTmpEnd = str.lastIndexOf(quote);
      var varContentTmp = str.slice(varContentTmpStart,varContentTmpEnd);
      var varContentTmpObj = window.document.getElementById(varContentTmp);
      //取得到组件
      if (varContentTmpObj!==null)
      {
        if (propty===null) {
          switch (varContentTmpObj.getAttribute("ucctype")) {
            case "ComboBox" : varObj.varContent = varContentTmpObj.options[varContentTmpObj.selectedIndex].text; break;
            case "Label" : varObj.varContent = varContentTmpObj.innerText; break;
            case "TextBox" : varObj.varContent = varContentTmpObj.value; break;
            default: break;
          }
        } else {
          //此处补全
          //console.log(str+" default propty");
          switch (varContentTmpObj.getAttribute("ucctype")) {
            case "ComboBox" : varObj.varContent = varContentTmpObj.options[varContentTmpObj.selectedIndex].text; break;
            case "Label" : varObj.varContent = varContentTmpObj.innerText; break;
            case "TextBox" : varObj.varContent = varContentTmpObj.value; break;
            default: break;
          }
          if (propty=="Forecolor") {
            varObj.varContent = varContentTmpObj.style.color
          }
        }
      }

      //取不到组件
      //探测变量是否存在
      else if (eval("typeof "+varContentTmp+"!=='undefined'")) {
        varObj.varType = "@gblvar";
        varObj.varContent = eval(varContentTmp).varContent;
        }
        else {
          return throwerror(varContentTmp,1);
        }
    }

    //字符串形式
    else {
      varObj.varType = "string";
      var varContentTmpStart = str.indexOf(quote) + 1;
      var varContentTmpEnd = str.lastIndexOf(quote);
      varObj.varContent = str.slice(varContentTmpStart,varContentTmpEnd);
    }
  }

    //组件id形式
    //window.document.getElementById(str)即取址操作
    //?.caption直接忽略默认操作
  else if(window.document.getElementById(str.slice(0,point))!==null){
    varObj = window.document.getElementById(str.slice(0,point));
    varObj.varType = "toolId";
    if (propty===null) {
      switch (varObj.getAttribute("ucctype")) {
        case "ComboBox" : varObj.varContent = varObj.options[varObj.selectedIndex].text; break;
        case "Label" : varObj.varContent = varObj.innerText; break;
        case "TextBox" : varObj.varContent = varObj.value; break;
        default: break;
      }
    } else {
      //console.log(str+" default propty");
      //此处补全
      switch (varObj.getAttribute("ucctype")) {
        case "ComboBox" : varObj.varContent = varObj.options[varObj.selectedIndex].text; break;
        case "Label" : varObj.varContent = varObj.innerText; break;
        case "TextBox" : varObj.varContent = varObj.value; break;
        default: break;
      }
      if (propty=="Forecolor") {
        varObj.varContent = varObj.style.color;
        varObj.varType = "toolId_Forecolor";
      }
    }
    //防止空元素无法执行
    if (!isNaN(varObj.varContent)){
      varObj.varContent = parseFloat(varObj.varContent);
    }
  }

    //全局变量形式
    else{
      if(str.search(/@/)!==-1){
        varObj.varContent = ucctojs(str.slice(1,str.length)).varContent;
        varObj.varType = "@Var";
      } else if(eval("typeof "+str+"==='object'")){

        varObj = eval(str);
        varObj.varType = "gblVar";
      } else if (!isNaN(str.slice(0,str.length))) {
        varObj.varContent = parseFloat(str.slice(0,str.length));
        varObj.varType = "number";
      } else {
        return throwerror(str,2);
      }
    }
   return varObj;
}

//-----------------------------------------------------= throwerror函数 =-----------------------------------------
function throwerror(str,No) {

  var obj = new Object();

  switch (No) {
    case 1:{
      console.log('!warn!:'+str+' 组件不存在 做字符串处理');
      obj.varType = "string";
      obj.varContent = "@"+str;
      break;
    }
    case 2:{
      console.log('!warn!:'+str+' 变量不存在 做字符串处理');
      obj.varType = "string";
      obj.varContent = str;
      break;
    }
      //default:
  }
  return obj;
}

//-----------------------------------------------------= init函数 =-----------------------------------------
function init(Str) {
  var MainFx = {varType:"MainFx",varContent:""};
  var mainFx = {varType:"MainFx",varContent:""};

  var FxObj = Str;
  var FxObjNameList = Object.getOwnPropertyNames(FxObj);
  var iInJs=0;
  var iMaxInJs = FxObjNameList.length;

  if (typeof FxObj.Main!=="undefined" || typeof FxObj.main!=="undefined") {
    iMaxInJs = FxObjNameList.length-1;
  }

  while (iInJs<iMaxInJs) {
    if (typeof FxObj[FxObjNameList[iInJs]]!=="object") {
      //初始化全局变量
      eval(FxObjNameList[iInJs]+"={varContent:FxObj[FxObjNameList[iInJs]]}")
    } else {
      //初始化为全局变量
      if (FxObjNameList[iInJs].indexOf('[')===-1) {
        //console.log(FxObjNameList[iInJs]+"={varContent:"+"\'\'}");
         FxList = new Array();
         PrmList = new Array();
        eval(FxObjNameList[iInJs]+"={varContent:''}")
        var NowFxObj = FxObj[FxObjNameList[iInJs]];
        var j=0;
        while (j<NowFxObj.length) {
          //eval(NowFxObj)
          //console.log(NowFxObj);
          //NowFxObj内部是 [{key1:value1},{key2:value2},...]
          //var jFxName = Object.getOwnPropertyNames(NowFxObj[j]);
          FxList[j] = Object.getOwnPropertyNames(NowFxObj[j])[0];
          PrmList[j] = NowFxObj[j][FxList[j]];
          j++;
        }
        var FxRealObj = ucctojs(FxObjNameList[iInJs]);
        FxRealObj.varContent={FxListKey:FxList,PrmListKey:PrmList};
        //console.log(FxObjNameList[iInJs],FxRealObj.varContent,'\n');
      }
    }
    iInJs++;
    //console.log(iInJs);
  }

//fun_main
  if (typeof FxObj.fun_main!=="undefined") {
    var i=0;
    while (i<fun_main.varContent.FxListKey.length) {
      //console.log(fun_main.varContent.FxListKey[i],fun_main.varContent.PrmListKey[i]);
      eval(fun_main.varContent.FxListKey[i]+"(fun_main.varContent.PrmListKey[i])")
      i++;

    }
    //eval(fun_main.varContent);
  }
  var k = 0;
  //Main
  if (typeof FxObj.Main!=="undefined") {
    while (k<FxObj.Main.length) {
      var MainFxName = Object.getOwnPropertyNames(FxObj.Main[k]);
      MainFx.varContent += MainFxName+'(\''+FxObj.Main[k][MainFxName]+'\');';
      k++;
    }
    console.log(MainFx.varContent);
    eval(MainFx.varContent);
  }
  //main
  if (typeof FxObj.main!=="undefined") {
    while (k<FxObj.main.length) {
      var mainFxName = Object.getOwnPropertyNames(FxObj.main[k]);
      mainFx.varContent += mainFxName+'(\''+FxObj.main[k][mainFxName]+'\');';
      k++;
    }
    console.log(mainFx.varContent);
    eval(mainFx.varContent);
  }
}


//-----------------------------------------------------= push函数 =-----------------------------------------
function push(obj){
  if(obj.varType==="toolId")
  {
    switch (obj.getAttribute("ucctype")) {
      case "ComboBox" : obj.options[obj.selectedIndex].text = obj.varContent; break;
      case "Label" : obj.innerText = obj.varContent; break;
      case "TextBox" : obj.value = obj.varContent; break;
      default: break;
    }
  }
  if (obj.varType==="toolId_Forecolor") {
    obj.style.color = obj.varContent;
    if (obj.varContent===0) {
      obj.style.color = "black"
    }
    if (obj.varContent===16777215) {
      obj.style.color = "white"
    }
  }
}

//-----------------------------------------------------= DividePoint函数 =-----------------------------------------
function DividePoint(str,Pct) {
  var Reg = new RegExp(Pct,'g');
  var Pos =-1;
  var LeftStr = undefined;
  var RightStr = undefined;

  while (str.search(Reg)!==-1) {

    var SqtLeftNum = 0;
    var SqtRightNum = 0;
    var DqtLeftNum = 0;
    var DqtRightNum = 0;

    Pos = str.search(Reg);
    LeftStr = str.slice(0,Pos);
    RightStr = str.slice(Pos+1,str.length);

    if (LeftStr.match(/'/g)!==null) {
      SqtLeftNum = LeftStr.match(/'/g).length;
    } else {
      SqtLeftNum = 0;
    }
    if (RightStr.match(/'/g)!==null) {
      SqtRightNum = RightStr.match(/'/g).length;
    } else {
      SqtRightNum = 0;
    }
    if (LeftStr.match(/"/g)!==null) {
      DqtLeftNum = LeftStr.match(/"/g).length;
    } else {
      DqtLeftNum = 0;
    }
    if (RightStr.match(/"/g)!==null) {
      DqtRightNum = RightStr.match(/"/g).length;
    } else {
      DqtRightNum = 0;
    }
    //"'"的情况未考虑
    if (SqtLeftNum%2===0 && SqtRightNum%2===0 && DqtLeftNum%2===0 && DqtRightNum%2===0) {
      return Pos;
    }
    //@代替=
    str = str.slice(0,Pos) + "@" + str.slice(Pos+1,str.length);
  }
  return -1;
}
