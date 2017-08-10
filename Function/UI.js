function HideLayer(Str){
  Str += ',';
  while (DividePoint(Str,',')!==-1) {
    ucctojs(Str.slice(0,DividePoint(Str,','))).style.display="none";
    Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
}

function ShowLayer(Str){
  Str += ',';
  var Obj;
    while (DividePoint(Str,',')!==-1) {
      Obj = ucctojs(Str.slice(0,DividePoint(Str,',')));
//      if (Obj.getAttribute("ucctype")==="Layer") {
        Obj.style.display="block";
//      }else {throwerror(Str,100)}
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
    }
}

function HideButton(Str){
    Str +=',';
    var Obj,Objspan;
    while (DividePoint(Str,',')!==-1) {
      Obj = ucctojs(Str.slice(0,DividePoint(Str,',')));
      Objspan = ucctojs(Str.slice(0,DividePoint(Str,','))+"span");
      if(Obj.getAttribute("ucctype")=="Image"||Obj.getAttribute("ucctype")=="Gif"||Obj.getAttribute("ucctype")=="Apng"||Obj.getAttribute("ucctype")=="Label"){
         Obj.style.display="none";
         Objspan.style.display="none";
      }
      else{
          console.log('error:'+ Str.slice(0,DividePoint(Str,','))+'操作对象不是button类型，此函数对其无作用');
      }
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
    }
}
function ShowButton(Str){
    Str +=',';
    var Obj,Objspan;
    while (DividePoint(Str,',')!==-1) {
      Obj = ucctojs(Str.slice(0,DividePoint(Str,',')));
      Objspan = ucctojs(Str.slice(0,DividePoint(Str,','))+"span");
      if(Obj.getAttribute("ucctype")=="Image"||Obj.getAttribute("ucctype")=="Gif"||Obj.getAttribute("ucctype")=="Apng"||Obj.getAttribute("ucctype")=="Label"){
         Obj.style.display="block";
         Objspan.style.display="block";
      }
      else{
          console.log('error:'+ Str.slice(0,DividePoint(Str,','))+'操作对象不是button类型，此函数对其无作用');
      }
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
    }
}
