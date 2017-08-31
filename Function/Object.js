//-----------------------------------------------------= Set函数 =-----------------------------------------
function Set(Str){
  console.log(Str);
  return (function (){
    //Return端对象处理
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj;
    //Right端对象处理
    var RightObj = ucctojs(Str.slice(DividePoint(Str,'=')+1,Str.length));
    //支持Button(id1,id2).propty
    if (RtnStr.indexOf('(')!==-1) {
      if (DividePoint(RtnStr,'.')!==-1) {
        var Propty = RtnStr.slice(RtnStr.indexOf('.')+1,RtnStr.length);
        RtnStr = RtnStr.replace(/,/g,'.'+Propty+',');
        RtnStr = RtnStr.slice(RtnStr.indexOf('(')+1,RtnStr.indexOf(')'))+'.'+Propty;
      } else {
        RtnStr = RtnStr.slice(RtnStr.indexOf('(')+1,RtnStr.indexOf(')'));
      }
    }
    RtnStr += ',';
    while (DividePoint(RtnStr,',')!==-1) {
      RtnObj = ucctojs(RtnStr.slice(0,DividePoint(RtnStr,',')));
      RtnObj.varContent = RightObj.varContent;
      push(RtnObj);
      RtnStr = RtnStr.slice(DividePoint(RtnStr,',')+1,RtnStr.length);
    }
  })()
}

//-----------------------------------------------------= Clear =-----------------------------------------
function Clear(Str) {
  var Obj;
  Str += ',';
  while (DividePoint(Str,',')!==-1) {
    Obj = ucctojs(Str.slice(0,DividePoint(Str,',')));
    Obj.varContent = null;
    push(Obj);
    Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
}

//-----------------------------------------------------= Get =-----------------------------------------
function Get(Str) {
  var RtnObj = ucctojs(Str.slice(0,DividePoint(Str,'=')));
  RntObj.varContent = ucctojs(Str.slice(DividePoint(Str,'=')+1,Str.length)).varContent;
  push(RtnObj);
}

//-----------------------------------------------------= Clone =-----------------------------------------
function Clone(Str) {
  var RightObj = ucctojs(Str.slice(DividePoint(Str,'=')+1,Str.length));
  var RtnObj ;
  Str = Str.slice(0,DividePoint(Str,'='));
  Str += ',';
  while (DividePoint(Str,',')!==-1) {
    RtnObj = ucctojs(Str.slice(0,DividePoint(Str,',')));
    RtnObj.varContent = RightObj.varContent
    push(RtnObj);
    Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
}

//-----------------------------------------------------= New =-----------------------------------------
function New(Str) {
  var RtnObj = ucctojs(Str.slice(0,DividePoint(Str,'=')));
  var TypeNameStr =ucctojs(Str.slice(DividePoint(Str,'=')+1,DividePoint(Str,','))).varContent ;
  Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  var IDStr = Str.slice(0,DividePoint(Str,','));
  Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  if (DividePoint(Str,',')!==-1) {
    var TitleStr = Str.slice(0,DividePoint(Str,','));
    var ContainerStr = ucctojs(Str.slice(DividePoint(Str,',')+1,Str.length)).varContent;
  }
  else {
    var TitleStr = Str.slice(0,Str.length);
    var ContainerStr = "Me";
  }
  //对应初始化
  var NewNode = window.document.createElement(TypeNameStr);
  NewNode.id = IDStr;
  NewNode.Title = TitleStr;
  NewNode.style.display = "none";

  var ParentObj = window.document.getElementById(ContainerStr);
  ParentObj.appendChild(NewNode);

  RtnObj.varContent = NewNode.id;
  push(RtnObj);
}

function Add() {

}
