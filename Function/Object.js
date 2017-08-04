
function Set(str){

  var rtnValue = str.slice(0,Divide(str,'='));
  var rightvalue = str.slice(Divide(str,'=')+1,str.length);

  var rtnObj = ucctojs(rtnValue);
  var rightobj = ucctojs(rightvalue);
  rtnObj.varContent = rightobj.varContent;
  push(rtnObj);
}
