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
