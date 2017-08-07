
function Set(str){

  //Return端对象处理
  var RtnStr = str.slice(0,DividePoint(str,'='));
  var RtnObjArray = new Array();
  //Right端对象处理
  var RightStr = str.slice(DividePoint(str,'=')+1,str.length);
  var RightObj = ucctojs(RightStr);
  var i = 0;

  while (DividePoint(RtnStr,',')!==-1) {
    RtnObjArray[i] = ucctojs(RtnStr.slice(0,DividePoint(RtnStr,',')));
    RtnObjArray[i].varContent = RightObj.varContent;
    push(RtnObjArray[i]);
    i++;
    RtnStr = RtnStr.slice(DividePoint(RtnStr,',')+1,str.length);
  }
  RtnObjArray[i] = ucctojs(RtnStr);
  RtnObjArray[i].varContent = RightObj.varContent;
  push(RtnObjArray[i]);

}
