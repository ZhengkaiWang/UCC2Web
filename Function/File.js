function GetFileNameFromURI(Str){
    Str += ',';
    var RtnObj = ucctojs(Str.slice(0,DividePoint(Str,'=')));
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
  if (sonObjArray.length==0) {
      RtnObj.varContent = "";
  }else if(sonObjArray.length>=1 && sonObjArray[0].varContent!==undefined && typeof sonObjArray[0].varContent==="string" ) {
    //console.log(sonObjArray);
      var pos1=sonObjArray[0].varContent.lastIndexOf("\\");//查找最后一个\的位置
      if(pos1!==-1){
          RtnObj.varContent = sonObjArray[0].varContent.substring(pos1+1,sonObjArray[0].varContent.length);
      }
      else{
          RtnObj.varContent = "";
      }
  }
    push(RtnObj);
}
