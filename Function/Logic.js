//IF函数
//.*Obj js操作对象 js端
//.*Str 字符串 一堆东西的集合

function IF(Str) {
  var Rst;
  var RtnStr = null;
  if(DividePoint(Str,'=')!==-1){
    RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
  }

  if (DividePoint(Str,'>')!==-1) {var Logic = ">";}
  else if (DividePoint(Str,'>=')!==-1) {var Logic = ">=";}
  else if (DividePoint(Str,'==')!==-1) {var Logic = "==";}
  else if (DividePoint(Str,'<>')!==-1) {var Logic = "<>";}
  else if (DividePoint(Str,'<=')!==-1) {var Logic = "<=";}
  else if (DividePoint(Str,'<')!==-1) {var Logic = "<";}
  else if (DividePoint(Str,'LIKE REG')!==-1) {var Logic = "LIKE REG";}
  else {console.error("无效Logic");  }

  var BoolLeftObj = ucctojs(Str.slice(0,DividePoint(Str,Logic)));
  var BoolRightObj = ucctojs(Str.slice(DividePoint(Str,Logic)+Logic.length,DividePoint(Str,"Then")));
  //console.log(BoolRightObj);
  if (DividePoint(Str,"Else")!==-1) {
    var TrueObj = ucctojs(Str.slice(DividePoint(Str,"Then")+5,DividePoint(Str,"Else")));
    var FalseObj = ucctojs(Str.slice(DividePoint(Str,"Else")+5,Str.length));
  } else {
    var TrueObj = ucctojs(Str.slice(DividePoint(Str,"Then")+5),Str.length);
    if (RtnStr!==null) {
      var FalseObj = RtnObj.varContent;
    } else {
      var FalseObj = null;
    }
  }

  if (eval("BoolLeftObj.varContent"+Logic+"BoolRightObj.varContent")) {
    Rst = TrueObj.varContent;
  } else {Rst = FalseObj.varContent;}

  if (RtnStr!==null) {
    RtnObj.varContent = Rst;
    push(RtnObj);
  } else {return Rst;}

}
