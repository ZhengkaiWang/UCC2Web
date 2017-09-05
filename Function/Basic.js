//-----------------------------------------------------= ucctojs函数 =-----------------------------------------
//ucctojs函数 将ucc中的元变量转换为js中可操作对象
// var变量
// varType ucc元变量在js对应变量类型
// varContent ucc元变量在js对应变量
// .*Tmp *Start *End *Str即字面意
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

function ucctojs(Str) {
  Str = Str.trim();

  var varObj = new Object();
  var varType;
  var point = Str.length;
  var propty = null;

  //判断是否有 ".属性值"
  if(Str.indexOf('.')!==-1){
    point = Str.indexOf('.');
    propty = Str.slice(point+1,Str.length);
  }

  //若有引号
  if(Str.search(/'.*'/)!==-1 || Str.search(/".*"/)!==-1){
    if (Str.search(/'.*'/)!==-1) {
      var quote = "'"
    } else {
      var quote = '"'
    }

    //若有@
    //"@组件id @gblvar"形式
    if(Str.search(/@/)!==-1){
      varObj.varType = "@Str";
      var varContentTmp = Str.slice(Str.search(/@/) + 1,Str.lastIndexOf(quote));
      //取得到组件
      if (window.document.getElementById(varContentTmp)!==null){
        if (propty!==null) {
          varObj.varContent = ucctojs(varContentTmp+'.'+propty).varContent;
        } else {
          varObj.varContent = ucctojs(varContentTmp).varContent;
        }
      }

      //取不到组件
      //探测变量是否存在
      else if (eval("typeof "+varContentTmp+"!=='undefined'")) {
        varObj.varType = "@gblvar";
        varObj.varContent = ucctojs(varContentTmp).varContent;
        }
        else {
          return throwerror(varContentTmp,1);
        }
    }

    //字符串形式
    else {
      varObj.varType = "String";
      var varContentTmpStart = Str.indexOf(quote) + 1;
      var varContentTmpEnd = Str.lastIndexOf(quote);
      varObj.varContent = Str.slice(varContentTmpStart,varContentTmpEnd);
    }
    if (typeof ConstantV(varObj.varContent)==="object") {
      //常量处理
      varObj = ConstantV(varObj.varContent);
    }
  }

    //组件id形式
    //window.document.getElementById(Str)即取址操作
    //?.caption直接忽略默认操作
  else if(window.document.getElementById(Str.slice(0,point))!==null){
    varObj = window.document.getElementById(Str.slice(0,point));
    varObj.varType = "toolId";
    if (propty===null) {
      switch (varObj.getAttribute("ucctype")) {
        case "ComboBox" : varObj.varContent = varObj.options[varObj.selectedIndex].text; break;
        case "Label" : varObj.varContent = varObj.innerText; break;
        case "TextBox" : varObj.varContent = varObj.value; break;
        default: break;
      }
    } else {
      //console.log(Str+" default propty");
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
    if (typeof ConstantV(varObj.varContent)==="object") {
      //常量处理
      varObj.varContent = ConstantV(varObj.varContent).varContent;
    }
  }

    //全局变量形式
    else{
      if(Str.search(/@/)!==-1){
        varObj.varContent = ucctojs(Str.slice(1,Str.length)).varContent;
        varObj.varType = "@Var";
      } else if(eval("typeof "+Str+"==='object'")){
        varObj = eval(Str);
        varObj.varType = "gblVar";
      } else if (typeof ConstantV(Str)==="object") {
        //常量处理
        varObj = ConstantV(Str);
      } else {
        throwerror(Str,2);
      }
    }
  return varObj;
}

//-----------------------------------------------------= throwerror函数 =-----------------------------------------
function throwerror(Str,No) {

  var obj = new Object();

  switch (No) {
    case 1:{
      console.log('!warn!:'+Str+' @对象不存在 做字符串处理');
      obj.varType = "String";
      obj.varContent = "@"+Str;
      break;
    }
    case 2:{
      console.log('!warn!:'+Str+' 变量不存在 做字符串处理');
      obj.varType = "String";
      obj.varContent = Str;
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

  // if (typeof FxObj.Main!=="undefined" || typeof FxObj.main!=="undefined") {
  //   iMaxInJs = FxObjNameList.length-1;
  // }

  while (iInJs<iMaxInJs) {
    if (typeof FxObj[FxObjNameList[iInJs]]!=="object") {
      //初始化全局变量
      eval(FxObjNameList[iInJs]+"={varContent:FxObj[FxObjNameList[iInJs]]}")
      if (typeof ConstantV(FxObj[FxObjNameList[iInJs]])==="object") {
          //常量处理
          eval(FxObjNameList[iInJs]+"=ConstantV(FxObj[FxObjNameList[iInJs]])");
        }
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
    RunAction("fun_main")
  }
  //Main
  if (typeof FxObj.Main!=="undefined") {
    RunAction("Main")
  }
  //main
  if (typeof FxObj.main!=="undefined") {
    RunAction("main")
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
function DividePoint(Str,Pct) {
  var Reg = new RegExp(Pct,'g');
  var Pos =-1;
  var LeftStr = undefined;
  var RightStr = undefined;

  while (Str.search(Reg)!==-1) {

    var SqtLeftNum = 0;
    var SqtRightNum = 0;
    var DqtLeftNum = 0;
    var DqtRightNum = 0;

    Pos = Str.search(Reg);
    LeftStr = Str.slice(0,Pos);
    RightStr = Str.slice(Pos+1,Str.length);

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
    Str = Str.slice(0,Pos) + "@" + Str.slice(Pos+1,Str.length);
  }
  return -1;
}

//将常量处理成js的对象
function ConstantV(Str) {
  if (typeof Str!=="string") {
    return -1;
  }
  var RtnConstant = new Object();
  if (!isNaN(Str) && Str!=="") {
    RtnConstant.varContent = parseFloat(Str);
    RtnConstant.varType = "number";
  } else if (Str=="True") {
    RtnConstant.varContent = true;
    RtnConstant.varType = "bool";
  } else if (Str=="False") {
    RtnConstant.varContent = false;
    RtnConstant.varType = "bool";
  } else {
    return -1;
  }
  return RtnConstant;
}
