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
