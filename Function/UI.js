function HideLayer(id){
  var obj = ucctojs(id);
  obj.style.display="none";
}

function ShowLayer(id){
  var obj = ucctojs(id);
  obj.style.display="block";
}

function HideButton(str){
    var sonObjArray = new Array();
    var i = 0;
    while (str.search(/,/)!==-1) {
      sonObjArray[i] = ucctojs(str.slice(0,DividePoint(str,',')));
      sonObjArray[i].style.display="none";
      i++;
      str = str.slice(DividePoint(str,',')+1,str.length);
    }
    sonObjArray[i] = ucctojs(str);
    sonObjArray[i].style.display="none";
}
function showButton(str){
    var sonObjArray = new Array();
    var i = 0;
    while (str.search(/,/)!==-1) {
      sonObjArray[i] = ucctojs(str.slice(0,DividePoint(str,',')));
      sonObjArray[i].style.display="block";
      i++;
      str = str.slice(DividePoint(str,',')+1,str.length);
    }
    sonObjArray[i] = ucctojs(str);
    sonObjArray[i].style.display="block";
}
