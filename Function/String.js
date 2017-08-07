
function LinkString(str) {

  var RtnStr = str.slice(0,DividePoint(str,'='));
  var RtnObj = ucctojs(RtnStr);
  str = str.slice(DividePoint(str,'=')+1,str.length);

  var sonStrArray = new Array();
  var sonObjArray = new Array();
  var i = 0;

  while (str.search(/,/)!==-1) {
    sonObjArray[i] = ucctojs(str.slice(0,DividePoint(str,',')));
    RtnObj.varContent += sonObjArray[i].varContent
    i++;
    str = str.slice(DividePoint(str,',')+1,str.length);
  }
  sonObjArray[i] = ucctojs(str);
  RtnObj.varContent += sonObjArray[i].varContent;
  push(RtnObj);

}
