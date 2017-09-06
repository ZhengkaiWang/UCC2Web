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
  var LayObj;
    while (DividePoint(Str,',')!==-1) {
      LayObj = ucctojs(Str.slice(0,DividePoint(Str,',')));
//      if (Obj.getAttribute("ucctype")==="Layer") {
        LayObj.style.display="block";
//      }else {throwerror(Str,100)}
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
    }
}
//-----------------------------------------------------= HideButton函数 =-----------------------------------------
function HideButton(Str){
    Str +=',';
    var BtnObj,TtlObj;
    while (DividePoint(Str,',')!==-1) {
      BtnObj = ucctojs(Str.slice(0,DividePoint(Str,',')));
      if(BtnObj.getAttribute("ucctype")=="Image"||BtnObj.getAttribute("ucctype")=="Gif"||BtnObj.getAttribute("ucctype")=="Apng"||BtnObj.getAttribute("ucctype")=="Label"){
        BtnObj.style.display="none";
        if (window.document.getElementById(Str.slice(0,DividePoint(Str,','))+"span")!==null) {
          TtlObj = ucctojs(Str.slice(0,DividePoint(Str,','))+"span");
          TtlObj.style.display="none";
        }
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
    var BtnObj,TtlObj;
    while (DividePoint(Str,',')!==-1) {
      BtnObj = ucctojs(Str.slice(0,DividePoint(Str,',')));
      if(BtnObj.getAttribute("ucctype")=="Image"||BtnObj.getAttribute("ucctype")=="Gif"||BtnObj.getAttribute("ucctype")=="Apng"||BtnObj.getAttribute("ucctype")=="Label"){
         BtnObj.style.display="block";
         if (window.document.getElementById(Str.slice(0,DividePoint(Str,','))+"span")!==null) {
           TtlObj = ucctojs(Str.slice(0,DividePoint(Str,','))+"span");
           TtlObj.style.display="block";
         }
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
    var CtrObj;
    while (DividePoint(Str,',')!==-1) {
      CtrObj = ucctojs(Str.slice(0,DividePoint(Str,',')));
      var type = CtrObj.getAttribute("ucctype");
      switch (type) {
          case "CommandButton":
              CtrObj.style.display="none";
              break;
          case "TextBox":
              CtrObj.style.display="none";
              break;
          case "CheckBox":
              CtrObj.style.display="none";
              break;
          case "OptionButton":
              CtrObj.style.display="none";
              break;
          case "ComboBox":
              CtrObj.style.display="none";
              break;
          case "ListBox":
              CtrObj.style.display="none";
              break;
          case "Report":
              CtrObj.style.display="none";
              break;
          case "Chart":
              CtrObj.style.display="none";
              break;
          case "Tree":
              CtrObj.style.display="none";
              break;
          case "ProgressBar":
              CtrObj.style.display="none";
              break;
          case "DateBox":
              CtrObj.style.display="none";
              break;
          case "TimeBox":
              CtrObj.style.display="none";
              break;
          case "WebBrowser":
              CtrObj.style.display="none";
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
    var CtrObj;
    while (DividePoint(Str,',')!==-1) {
      CtrObj = ucctojs(Str.slice(0,DividePoint(Str,',')));
      var type = CtrObj.getAttribute("ucctype");
      switch (type) {
          case "CommandButton":
              CtrObj.style.display="block";
              break;
          case "TextBox":
              CtrObj.style.display="block";
              break;
          case "CheckBox":
              CtrObj.style.display="block";
              break;
          case "OptionButton":
              CtrObj.style.display="block";
              break;
          case "ComboBox":
              CtrObj.style.display="block";
              break;
          case "ListBox":
              CtrObj.style.display="block";
              break;
          case "Report":
              CtrObj.style.display="block";
              break;
          case "Chart":
              CtrObj.style.display="block";
              break;
          case "Tree":
              CtrObj.style.display="block";
              break;
          case "ProgressBar":
              CtrObj.style.display="block";
              break;
          case "DateBox":
              CtrObj.style.display="block";
              break;
          case "TimeBox":
              CtrObj.style.display="block";
              break;
          case "WebBrowser":
              CtrObj.style.display="block";
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
//-----------------------------------------------------= ShowScreen =-----------------------------------------
function ShowScreen(Str) {
  Str += ',';
  while (DividePoint(Str,',')!==-1) {
    ucctojs(Str.slice(0,DividePoint(Str,','))).style.display="block";
    Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
}
//-----------------------------------------------------= HideScreen =-----------------------------------------
function HideScreen(Str) {
  Str += ',';
  while (DividePoint(Str,',')!==-1) {
    ucctojs(Str.slice(0,DividePoint(Str,','))).style.display="none";
    Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
}
//-----------------------------------------------------= SetOnTop =-----------------------------------------
function SetOnTop(Str) {
  //console.log("? SetOnTop?",Str);
    Str += ',';
    var i =1000;
    while (DividePoint(Str,',')!==-1) {
        LayObj = ucctojs(Str.slice(0,DividePoint(Str,',')));
        LayObj.style.zIndex=i--;
        Str = Str.slice(DividePoint(Str,',')+1,Str.length);
    }
}
//-----------------------------------------------------= Transparent =-----------------------------------------
function Transparent(Str) {
  console.log("? Transparent",Str);
}
function Move(Str) {
  console.log("? Move",Str);
}
