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

function Move(Str){
    Str += ',';
    // var RtnStr = Str.slice(0,DividePoint(Str,'='));
    // var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    var sonObjArray = new Array();
    var i=0;
    while (DividePoint(Str,',')!==-1) {
      sonObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
     var left = sonObjArray[0].offsetLeft;
     var top = sonObjArray[0].offsetTop;
     var width = sonObjArray[0].offsetWidth;
     var height = sonObjArray[0].offsetHeight;
  if (sonObjArray.length==2) {
      console.log("hh");
      var lastposition = new Array();
      lastposition =  sonObjArray[1].varContent.split("-");
      sonObjArray[0].style.left = lastposition[0]+"px";
      sonObjArray[0].style.top = lastposition[1]+"px";
      sonObjArray[0].style.width = lastposition[2]+"px";
      sonObjArray[0].style.height = lastposition[3]+"px";

  }else if(sonObjArray.length==3) {
      var lastposition = new Array();
      lastposition =  sonObjArray[1].varContent.split(sonObjArray[1].varContent);
      sonObjArray[0].style.left = lastposition[0]+"px";
      sonObjArray[0].style.top = lastposition[1]+"px";
      sonObjArray[0].style.width = lastposition[2]+"px";
      sonObjArray[0].style.height = lastposition[3]+"px";
  }
  else if(sonObjArray.length>=4) {
      var lastposition = new Array();
      lastposition =  sonObjArray[1].varContent.split(sonObjArray[2].varContent);
      var speedleft = (lastposition[0]-left)/sonObjArray[3].varContent;
      var speedtop = (lastposition[1]-top)/sonObjArray[3].varContent;
      var speedwidth = (lastposition[2]-width)/sonObjArray[3].varContent;
      var speedheight = (lastposition[3]-height)/sonObjArray[3].varContent;
      function move1(){
          left = left+speedleft;
          top = top+speedtop;
          width = width+speedwidth;
          height = height+speedheight;
      }
      setInterval(move1,1);
       var num = 1;
       var i = setInterval(function() {
           num++;
           sonObjArray[0].style.left= left+"px";
           sonObjArray[0].style.top= top+"px";
           sonObjArray[0].style.width= width+"px";
           sonObjArray[0].style.height= height+"px";
           if(sonObjArray.length>=5){
              RunAction(sonObjArray[4].varContent); 
           }

           if (num >=sonObjArray[3].varContent){
                 clearInterval(i);
           }

       }, 1);
  }

}
