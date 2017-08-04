
function LinkString(str) {

  var rtnStr = str.slice(0,str.search(/[^=]=[^=]/)+1);
  str = str.slice(str.search(/[^=]=[^=]/)+2,str.length);

  var sonStrArray = new Array();
  var sonObjArray = new Array();
  var i = 0;

  while (str.search(/,/)!==-1) {
    sonStrArray[i] = str.slice(0,str.search(/,/));
    str = str.slice(str.search(/,/)+1,str.length);
    i++;
    iMax = i;
  }
  sonStrArray[iMax] = str;

  i = 0;

  rtnObj = ucctojs(rtnStr);
   while (i<=iMax) {
     sonObjArray[i] = ucctojs(sonStrArray[i]);
     rtnObj.varContent += sonObjArray[i].varContent
     i++;
   }

  push(rtnObj);

}
