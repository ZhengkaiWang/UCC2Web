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
function HideControl(Str){
    Str +=',';
    var Obj;
    while (DividePoint(Str,',')!==-1) {
      Obj = ucctojs(Str.slice(0,DividePoint(Str,',')));
      var type = Obj.getAttribute("ucctype");
      switch (type) {
          case "CommandButton":
              Obj.style.display="none";
              break;
          case "TextBox":
              Obj.style.display="none";
              break;
          case "CheckBox":
              Obj.style.display="none";
              break;
          case "OptionButton":
              Obj.style.display="none";
              break;
          case "ComboBox":
              Obj.style.display="none";
              break;
          case "ListBox":
              Obj.style.display="none";
              break;
          case "Report":
              Obj.style.display="none";
              break;
          case "Chart":
              Obj.style.display="none";
              break;
          case "Tree":
              Obj.style.display="none";
              break;
          case "ProgressBar":
              Obj.style.display="none";
              break;
          case "DateBox":
              Obj.style.display="none";
              break;
          case "TimeBox":
              Obj.style.display="none";
              break;
          case "WebBrowser":
              Obj.style.display="none";
              break;
          default:
              console.log('error:'+ Str.slice(0,DividePoint(Str,','))+'操作对象不是control类型，此函数对其无作用');
      }
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
    }
}
function ShowControl(Str){
    Str +=',';
    var Obj;
    while (DividePoint(Str,',')!==-1) {
      Obj = ucctojs(Str.slice(0,DividePoint(Str,',')));
      var type = Obj.getAttribute("ucctype");
      switch (type) {
          case "CommandButton":
              Obj.style.display="block";
              break;
          case "TextBox":
              Obj.style.display="block";
              break;
          case "CheckBox":
              Obj.style.display="block";
              break;
          case "OptionButton":
              Obj.style.display="block";
              break;
          case "ComboBox":
              Obj.style.display="block";
              break;
          case "ListBox":
              Obj.style.display="block";
              break;
          case "Report":
              Obj.style.display="block";
              break;
          case "Chart":
              Obj.style.display="block";
              break;
          case "Tree":
              Obj.style.display="block";
              break;
          case "ProgressBar":
              Obj.style.display="block";
              break;
          case "DateBox":
              Obj.style.display="block";
              break;
          case "TimeBox":
              Obj.style.display="block";
              break;
          case "WebBrowser":
              Obj.style.display="block";
              break;
          default:
              console.log('error:'+ Str.slice(0,DividePoint(Str,','))+'操作对象不是control类型，此函数对其无作用');
      }
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
    }
}
