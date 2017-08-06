
function Set(str){

  var RtnStr = str.slice(0,DividePoint(str,'='));
  var RightStr = str.slice(DividePoint(str,'=')+1,str.length);

  var RtnStrArray = new Array();
  var RtnObjArray = new Array();
  var i = 0;
  var iMax = 0;

  while (DividePoint(RtnStr,',')!==-1) {
    RtnStrArray[i] = RtnStr.slice(0,DividePoint(RtnStr,','));
    RtnStr = RtnStr.slice(DividePoint(RtnStr,',')+1,str.length);
    i++;
    iMax = i;
  }
  RtnStrArray[iMax] = RtnStr;

  i = 0;

  var RightObj = ucctojs(RightStr);

  while (i<=iMax) {
    RtnObjArray[i] = ucctojs(RtnStrArray[i]);
    RtnObjArray[i].varContent = RightObj.varContent;
    push(RtnObjArray[i]);
    i++;
  }

}
