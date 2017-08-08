function HideLayer(id){
  var obj = ucctojs(id);
  obj.style.display="none";
}

function ShowLayer(id){
  var obj = ucctojs(id);
  obj.style.display="block";
}

function HideButton(Str){
    Str +=',';
    var Obj;
    while (DividePoint(Str,',')!==-1) {
      Obj = ucctojs(Str.slice(0,DividePoint(Str,',')));
      if(Obj.getAttribute("ucctype")=="Image"||Obj.getAttribute("ucctype")=="Gif"||Obj.getAttribute("ucctype")=="Apng"||Obj.getAttribute("ucctype")=="Label"){
         Obj.style.display="none";
      }
      else{
          console.log('error:'+ Str.slice(0,DividePoint(Str,','))+'操作对象不是button类型，此函数对其无作用');
      }
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,str.length);
    }
}
function showButton(str){
    Str +=',';
    var Obj;
    while (DividePoint(Str,',')!==-1) {
      Obj = ucctojs(Str.slice(0,DividePoint(Str,',')));
      if(Obj.getAttribute("ucctype")=="Image"||Obj.getAttribute("ucctype")=="Gif"||Obj.getAttribute("ucctype")=="Apng"||Obj.getAttribute("ucctype")=="Label"){
         Obj.style.display="block";
      }
      else{
          console.log('error:'+ Str.slice(0,DividePoint(Str,','))+'操作对象不是button类型，此函数对其无作用');
      }
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,str.length);
    }
}
