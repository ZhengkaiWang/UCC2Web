//-----------------------------------------------------= HideLayer函数 =-----------------------------------------
function HideLayer(Str){
  Str += ',';
  while (DividePoint(Str,',')!==-1) {
    ucctojs(Str.slice(0,DividePoint(Str,','))).style.display="none";
    Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
}
//-----------------------------------------------------= ShowLayer函数 =-----------------------------------------
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
//-----------------------------------------------------= HideButton函数 =-----------------------------------------
function HideButton(Str){
    Str +=',';
    var Obj,ObjTitle;
    while (DividePoint(Str,',')!==-1) {
      Obj = ucctojs(Str.slice(0,DividePoint(Str,',')));
      ObjTitle = ucctojs(Str.slice(0,DividePoint(Str,','))+"span");
      if(Obj.getAttribute("ucctype")=="Image"||Obj.getAttribute("ucctype")=="Gif"||Obj.getAttribute("ucctype")=="Apng"||Obj.getAttribute("ucctype")=="Label"){
         Obj.style.display="none";
         ObjTitle.style.display="none";
      }
      else{
          console.log('error:'+ Str.slice(0,DividePoint(Str,','))+'操作对象不是button类型，此函数对其无作用');
      }
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
    }
}
//-----------------------------------------------------= ShowButton函数 =-----------------------------------------
function ShowButton(Str){
    Str +=',';
    var Obj,ObjTitle;
    while (DividePoint(Str,',')!==-1) {
      Obj = ucctojs(Str.slice(0,DividePoint(Str,',')));
      ObjTitle = ucctojs(Str.slice(0,DividePoint(Str,','))+"span");
      if(Obj.getAttribute("ucctype")=="Image"||Obj.getAttribute("ucctype")=="Gif"||Obj.getAttribute("ucctype")=="Apng"||Obj.getAttribute("ucctype")=="Label"){
         Obj.style.display="block";
         ObjTitle.style.display="block";
      }
      else{
          console.log('error:'+ Str.slice(0,DividePoint(Str,','))+'操作对象不是button类型，此函数对其无作用');
      }
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
    }
}
//-----------------------------------------------------= HideControl函数 =-----------------------------------------
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
//-----------------------------------------------------= ShowControl函数 =-----------------------------------------
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
//-----------------------------------------------------= Translucence函数 =-----------------------------------------
function Translucence(Str){
  //Return端对象处理
  var RtnObj = ucctojs(Str.slice(0,DividePoint(Str,'=')));
  //Right端对象处理
  var RightObj = ucctojs(Str.slice(DividePoint(Str,'=')+1,Str.length));
  var temp = RightObj.varContent;
  if(temp<0){
      temp=0;
  }
  else if (temp>255) {
       temp=255;
  } else {
     temp = temp;
  }
    RtnObj.style.opacity = temp/255;
    //rgba(0,0,0,0.5)
    //RtnObj.style.filter='alpha(opacity='+temp/2.25+')';
}
