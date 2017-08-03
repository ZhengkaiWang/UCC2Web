function GetCursorPos(str) {

  var rtnStr;
  if (str.search(/[^=]=[^=]/)!==-1) {
    rtnStr = str.slice(0,str.search(/[^=]=[^=]/)+1);
    rightStr = str.slice(str.search(/[^=]=[^=]/)+2,str.length);

    rtnObj = ucctojs(rtnStr);
    if(rightStr==="x"){
      rtnObj.varContent = event.clientX;
      alert(rtnObj.varContent);
    }else if (rightStr==="y") {
      rtnObj.varContent = event.clientY;
      alert(rtnObj.varContent);
    }else if (rightStr==="/") {
      rtnObj.varContent = event.clientX + "/" + event.clientY;
      alert(rtnObj.varContent);
    }else {
      //throwerror();
      alert("GetCursorPos()代码写错了= =")
    }
  } else {
    rtnStr = str;
    rtnObj = ucctojs(rtnStr);
    rtnObj.varContent = event.clientX + "/" + event.clientY;
  }

  push(rtnObj);
}
