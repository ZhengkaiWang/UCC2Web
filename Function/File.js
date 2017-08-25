function GetFileNameFromURI(Str){
    Str += ',';
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    var sonObjArray = new Array();
    var i=0;
    while (DividePoint(Str,',')!==-1) {
        if(Str.slice(0,DividePoint(Str,','))==""){
            console.log(sonObjArray.length);
            break;
        }
      sonObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
console.log(sonObjArray[0]);
  if (sonObjArray.length==0) {
      RtnObj.varContent = "";
  }else if(sonObjArray.length>=1) {
      var pos1=sonObjArray[0].varContent.lastIndexOf("\\");//查找最后一个\的位置
      console.log(pos1);

      var pos2=sonObjArray[0].varContent.lastIndexOf(".");//查找最后一个.的位置
            console.log(pos2);
      if(pos1!==-1&&pos2!==-1){
          RtnObj.varContent = sonObjArray[0].varContent.substring(pos1+1,pos2);
      }
      else{
          RtnObj.varContent = "";
      }
  }
    push(RtnObj);

}
