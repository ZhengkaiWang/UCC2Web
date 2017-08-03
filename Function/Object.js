
function Set(str){
  var rtnValue = str.slice(0,str.search(/[^=]=[^=]/)+1);
  var rightvalue = str.slice(str.search(/[^=]=[^=]/)+2,str.length);

  var rtnObj = ucctojs(rtnValue);
  var rightobj = ucctojs(rightvalue);
  rtnObj.varContent = rightobj.varContent;
  push(rtnObj);
}
