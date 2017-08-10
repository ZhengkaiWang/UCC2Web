//-----------------------------------------------------= Case =-----------------------------------------
function Case() {
  var Rst;

  if (DividePoint(Str,'>')!==-1) {var Logic = ">";}
  else if (DividePoint(Str,'>=')!==-1) {var Logic = ">=";}
  else if (DividePoint(Str,'==')!==-1) {var Logic = "==";}
  else if (DividePoint(Str,'<>')!==-1) {var Logic = "<>";}
  else if (DividePoint(Str,'<=')!==-1) {var Logic = "<=";}
  else if (DividePoint(Str,'<')!==-1) {var Logic = "<";}
  else if (DividePoint(Str,'LIKE REG')!==-1) {var Logic = "LIKE REG";}//?
  else {console.error("无效Logic");  }

  var BoolLeftObj = ucctojs(Str.slice(0,DividePoint(Str,Logic)));
  var BoolRightObj = ucctojs(Str.slice(DividePoint(Str,Logic)+Logic.length,DividePoint(Str,"Then")));
  //console.log(BoolRightObj);
  if (DividePoint(Str,"Else")!==-1) {
    var TrueAction = ucctojs(Str.slice(DividePoint(Str,"Then")+5,DividePoint(Str,"Else")));
    var FalseAction = ucctojs(Str.slice(DividePoint(Str,"Else")+5,Str.length));
  } else {
    var TrueAction = ucctojs(Str.slice(DividePoint(Str,"Then")+5),Str.length);
    if (RtnStr!==null) {
      var FalseAction = RtnObj.varContent;
    } else {
      var FalseAction = null;
    }
  }

  if (eval("BoolLeftObj.varContent"+Logic+"BoolRightObj.varContent")) {
    Rst = TrueAction.varContent;
  } else {Rst = FalseAction.varContent;}

}

//-----------------------------------------------------= IF =-----------------------------------------
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
  else if (DividePoint(Str,'LIKE REG')!==-1) {var Logic = "LIKE REG";}//?
  else {console.error("无效Logic");  }

  var BoolLeftObj = ucctojs(Str.slice(0,DividePoint(Str,Logic)));
  var BoolRightObj = ucctojs(Str.slice(DividePoint(Str,Logic)+Logic.length,DividePoint(Str,"Then")));
  //console.log(BoolRightObj);
  if (DividePoint(Str,"Else")!==-1) {
    var TrueValueObj = ucctojs(Str.slice(DividePoint(Str,"Then")+5,DividePoint(Str,"Else")));
    var FalseValueObj = ucctojs(Str.slice(DividePoint(Str,"Else")+5,Str.length));
  } else {
    var TrueValueObj = ucctojs(Str.slice(DividePoint(Str,"Then")+5),Str.length);
    if (RtnStr!==null) {
      var FalseValueObj = RtnObj.varContent;
    } else {
      var FalseValueObj = null;
    }
  }

  if (eval("BoolLeftObj.varContent"+Logic+"BoolRightObj.varContent")) {
    Rst = TrueValueObj.varContent;
  } else {Rst = FalseValueObj.varContent;}

  if (RtnStr!==null) {
    RtnObj.varContent = Rst;
    push(RtnObj);
  } else {return Rst;}
}
