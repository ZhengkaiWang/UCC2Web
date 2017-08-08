
function Set(Str){
  //Return端对象处理
  var RtnStr = Str.slice(0,DividePoint(Str,'='));
  var RtnObj;
  //Right端对象处理
  var RightObj = ucctojs(Str.slice(DividePoint(Str,'=')+1,Str.length));

  RtnStr += ',';
  while (DividePoint(RtnStr,',')!==-1) {
    RtnObj = ucctojs(RtnStr.slice(0,DividePoint(RtnStr,',')));
    RtnObj.varContent = RightObj.varContent;
    push(RtnObj);
    RtnStr = RtnStr.slice(DividePoint(RtnStr,',')+1,RtnStr.length);
  }
}

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
