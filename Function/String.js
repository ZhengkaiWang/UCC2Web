
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
//js的函数语句处理形式为：GetAsc:'asefsd','-';结果与ucc中的GetAsc:asefsd,-;结果
 function GetAsc(Str){
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    if(Str.search(/,/)!==-1){
        //等号右边以逗号隔开
         var Str2 =  ucctojs(Str.slice(DividePoint(Str,',')+1,Str.length));
         var Str1 = ucctojs(Str.slice(0,DividePoint(Str,',')));
         for(var i = 0; i<Str1.varContent.length;i++) {
             RtnObj.varContent+=Str1.varContent.charCodeAt(i);
              if(i<Str1.varContent.length-1){
                   RtnObj.varContent += Str2.varContent;
              }
         }
      }
    else{
        Str = ucctojs(Str);
        for(var i = 0; i<Str.varContent.length;i++) {
            RtnObj.varContent+=Str.varContent.charCodeAt(i);
             if(i<Str.varContent.length-1){
                  RtnObj.varContent += "-";
             }
        }
    }
    push(RtnObj);
}
