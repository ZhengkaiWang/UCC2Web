function HideLayer(Str){

  var ObjArray = new Array();
  var i = 0;

  while (DividePoint(Str,',')!==-1) {
    ObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
    ObjArray[i].style.display="none";
    i++;
    Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
  ObjArray[i] = ucctojs(Str);
  ObjArray[i].style.display="none";

}

function ShowLayer(Str){

    var ObjArray = new Array();
    var i = 0;

    while (DividePoint(Str,',')!==-1) {
      ObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
      ObjArray[i].style.display="block";
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
    }
    ObjArray[i] = ucctojs(Str);
    ObjArray[i].style.display="block";

}
