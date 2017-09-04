//-----------------------------------------------------= Case =-----------------------------------------
function Case(Str) {
  //console.log(Str);

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
  //console.log(BoolRightObj);
  if (DividePoint(Str,"Else")!==-1) {
    var TrueAction = Str.slice(DividePoint(Str,"Then")+5,DividePoint(Str,"Else"));
    var TrueActionFx = TrueAction.slice(0,DividePoint(TrueAction,':'));
    var TrueActionPrm = TrueAction.slice(DividePoint(TrueAction,':')+1,TrueAction.length);
    var FalseAction = Str.slice(DividePoint(Str,"Else")+5,Str.length);
    var FalseActionFx = FalseAction.slice(0,DividePoint(FalseAction,':'));
    var FalseActionPrm = FalseAction.slice(DividePoint(FalseAction,':')+1,FalseAction.length);
  } else {
    var TrueAction = Str.slice(DividePoint(Str,"Then")+5,Str.length);
    var TrueActionFx = TrueAction.slice(0,DividePoint(TrueAction,':'));
    var TrueActionPrm = TrueAction.slice(DividePoint(TrueAction,':')+1,TrueAction.length);
    var FalseAction = "";
    var FalseActionFx = "";
    var FalseActionPrm = "";
    }

  TrueActionPrm = TrueActionPrm.replace(/'/g,"\\'");
  FalseActionPrm = FalseActionPrm.replace(/"/g,'\\"');

  //console.log(BoolLeftObj.varContent+RealLogic+BoolRightObj.varContent);
  if (eval("BoolLeftObj.varContent"+RealLogic+"BoolRightObj.varContent")) {
    //console.log(TrueActionFx+'("'+TrueActionPrm+'")');
    eval(TrueActionFx+'("'+TrueActionPrm+'")')
  } else {
    eval(FalseActionFx+'("'+FalseActionPrm+'")')
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
  console.log("? For",Str);
}

function RunAction(Str) {
  var i=0;
  var Obj = ucctojs(Str);
  while (i<Obj.varContent.FxListKey.length) {
    eval(Obj.varContent.FxListKey[i]+"(Obj.varContent.PrmListKey[i])");
    i++;
  }
}

function ExitAction() {
  throw new Error('ExitAction');
}
