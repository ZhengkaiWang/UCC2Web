//IF函数
//.*value 取出来的值 ucc端
//.*obj js操作对象 js端
//.*var.* 变量 js端ucc端通用
//.*str 字符串 一堆东西的集合

function IF(str) {

  var rtnvalue = null;
  if(str.search(/[^=]=[^=]/)!=-1){
    rtnvalue = str.slice(0,str.search(/[^=]=[^=]/)+1);
    str = str.slice(str.search(/[^=]=[^=]/)+2,str.length);
  }

  var boolstrstart = 0;
  var boolstrend = str.search(/Then/);
  var boolstr = str.slice(boolstrstart,boolstrend);
  //alert(boolstr);
  var truevaluestart = boolstrend + 5;
  var truevalueend = str.search(/Else/);
  var truevalue = str.slice(truevaluestart,truevalueend);
  //alert(truevalue);
  var falsevaluestart = truevalueend + 5;
  var falsevalueend = str.length;
  var falsevalue = str.slice(falsevaluestart,falsevalueend);
  //alert(falsevalue);
  var leftvaluestart = 0;
  var leftvalueend = str.search(/==/);
  var leftvalue = str.slice(leftvaluestart,leftvalueend);
  var rightvaluestart = leftvalueend + 2;
  var rightvalueend = boolstrend;
  var rightvalue = str.slice(rightvaluestart,rightvalueend);
  //alert(rightvalue);

  var leftobj = ucctojs(leftvalue);
  var rightobj = ucctojs(rightvalue);
  var trueobj = ucctojs(truevalue);
  var falseobj = ucctojs(falsevalue);


  if(typeof rtnvalue!==null){
    var rtnobj = ucctojs(rtnvalue);
    if (leftobj.varContent===rightobj.varContent) {
      rtnobj.varContent = trueobj.varContent;
    }
    else {
      rtnobj.varContent = falseobj.varContent;
    }
    push(rtnobj);
  }
}
