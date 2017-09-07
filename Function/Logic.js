//-----------------------------------------------------= Case =-----------------------------------------
function Case(Str) {

  // 逻辑符判断？？
  if (DividePoint(Str,'<=')!==-1) {var Logic = "<=";var RealLogic = "<=";}
  else if (DividePoint(Str,'>=')!==-1) {var Logic = ">=";var RealLogic = ">=";}
  else if (DividePoint(Str,'==')!==-1) {var Logic = "==";var RealLogic = "==";}
  else if (DividePoint(Str,'<>')!==-1) {var Logic = "<>";var RealLogic = "!=";}
  else if (DividePoint(Str,'>')!==-1) {var Logic = ">";var RealLogic = ">";}
  else if (DividePoint(Str,'<')!==-1) {var Logic = "<";var RealLogic = ">";}
  else if (DividePoint(Str,'LIKE REG')!==-1) {var Logic = "LIKE REG";var RealLogic = "??"}//?
  else {console.error("无效Logic");  }

  var BoolLeftObj = ucctojs(Str.slice(0,DividePoint(Str,Logic)));
  var BoolRightObj = ucctojs(Str.slice(DividePoint(Str,Logic)+Logic.length,DividePoint(Str,"Then")));
  if (DividePoint(Str,"Else")!==-1) {
    var TrueAction = Str.slice(DividePoint(Str,"Then")+5,DividePoint(Str,"Else"));
    var FalseAction = Str.slice(DividePoint(Str,"Else")+5,Str.length);
  } else {
    var TrueAction = Str.slice(DividePoint(Str,"Then")+5,Str.length);
    var FalseAction = "";
    }

  if (eval("BoolLeftObj.varContent"+RealLogic+"BoolRightObj.varContent")) {
    RunAction(TrueAction)
  } else {
    if (FalseAction!=="") {
      RunAction(FalseAction)
    }
  }

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

    var TrueValueObj = ucctojs(Str.slice(DividePoint(Str,"Then")+5,Str.length));

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

function For(Str) {
  if (typeof Str.slice(0,DividePoint(Str,','))!=="number") {
    var iInJsFor = ucctojs(Str.slice(0,DividePoint(Str,',')));
    Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  } else {
    var iInJsFor={varContent:0};
  }
  var StartPos =  ucctojs(Str.slice(0,DividePoint(Str,','))).varContent;
  Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  if (DividePoint(Str,',')!==-1) {
    var EndPos = ucctojs(Str.slice(0,DividePoint(Str,','))).varContent;
    var Step =  ucctojs(Str.slice(DividePoint(Str,',')+1,DividePoint(Str,'='))).varContent;
  } else {
    var EndPos =  ucctojs(Str.slice(0,DividePoint(Str,'='))).varContent;
    var Step = 1;
  }
  for (iInJsFor.varContent = StartPos; iInJsFor.varContent<EndPos+1; iInJsFor.varContent+=Step) {
    RunAction(Str.slice(DividePoint(Str,'=')+1,Str.length));
  }
  iInJsFor.varContent--;
  push(iInJsFor);
}

function RunAction(Str) {
  if (Str.indexOf(':')!==-1) {
    eval(Str.slice(0,DividePoint(Str,':'))+"(Str.slice(DividePoint(Str,':')+1,Str.length))");
  } else {
    var Obj = ucctojs(Str);
    for (var i = 0; i < Obj.varContent.FxListKey.length; i++) {
      eval(Obj.varContent.FxListKey[i]+"(Obj.varContent.PrmListKey[i])");
    }
  }
}

function ExitAction() {
  throw new Error('ExitAction');
}
