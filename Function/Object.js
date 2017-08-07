
function Set(Str){

  //Return端对象处理
  var RtnStr = Str.slice(0,DividePoint(Str,'='));
  var RtnObjArray = new Array();
  //Right端对象处理
  var RightStr = Str.slice(DividePoint(Str,'=')+1,Str.length);
  var RightObj = ucctojs(RightStr);
  var i = 0;

  while (DividePoint(RtnStr,',')!==-1) {
    RtnObjArray[i] = ucctojs(RtnStr.slice(0,DividePoint(RtnStr,',')));
    RtnObjArray[i].varContent = RightObj.varContent;
    push(RtnObjArray[i]);
    i++;
    RtnStr = RtnStr.slice(DividePoint(RtnStr,',')+1,RtnStr.length);
  }
  RtnObjArray[i] = ucctojs(RtnStr);
  RtnObjArray[i].varContent = RightObj.varContent;
  push(RtnObjArray[i]);

}

function Clear(Str) {

  var ObjArray = new Array();
  var i = 0;

  while (DividePoint(Str,',')!==-1) {
    ObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
    ObjArray[i].varContent = null;
    push(ObjArray[i]);
    i++;
    Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
  ObjArray[i] = ucctojs(Str);
  ObjArray[i].varContent = null;
  push(ObjArray[i]);
}
