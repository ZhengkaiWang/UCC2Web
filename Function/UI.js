function HideLayer(id){
  var obj = ucctojs(id);
  obj.style.display="none";
}

function ShowLayer(id){
  var obj = ucctojs(id);
  obj.style.display="block";
}

function HideButton(str){
    var ObjArray = new Array();
    var i = 0;
    while (str.search(/,/)!==-1) {
      ObjArray[i] = ucctojs(str.slice(0,DividePoint(str,',')));
      if(ObjArray[i].getAttribute("ucctype")=="Image"||ObjArray[i].getAttribute("ucctype")=="Gif"||ObjArray[i].getAttribute("ucctype")=="Apng"||ObjArray[i].getAttribute("ucctype")=="Label"){
         ObjArray[i].style.display="none";
      }
      else{
          console.log('error:'+ str.slice(0,DividePoint(str,','))+'操作对象不是button类型，此函数对其无作用');
      }
      i++;
      str = str.slice(DividePoint(str,',')+1,str.length);

    }
    ObjArray[i] = ucctojs(str);
    if(ObjArray[i].getAttribute("ucctype")=="Image"||ObjArray[i].getAttribute("ucctype")=="Gif"||ObjArray[i].getAttribute("ucctype")=="Apng"||ObjArray[i].getAttribute("ucctype")=="Label"){
       ObjArray[i].style.display="none";
    }
    else{
        console.log('error:'+ str+'操作对象不是button类型，此函数对其无作用');
    }
}
function showButton(str){
    var ObjArray = new Array();
    var i = 0;
    while (str.search(/,/)!==-1) {
      ObjArray[i] = ucctojs(str.slice(0,DividePoint(str,',')));
      if(ObjArray[i].getAttribute("ucctype")=="Image"||ObjArray[i].getAttribute("ucctype")=="Gif"||ObjArray[i].getAttribute("ucctype")=="Apng"||ObjArray[i].getAttribute("ucctype")=="Label"){
         ObjArray[i].style.display="block";
      }
      else{
          console.log('error:'+ str.slice(0,DividePoint(str,','))+'操作对象不是button类型，此函数对其无作用');
      }
      i++;
      str = str.slice(DividePoint(str,',')+1,str.length);
    }
    ObjArray[i] = ucctojs(str);
    if(ObjArray[i].getAttribute("ucctype")=="Image"||ObjArray[i].getAttribute("ucctype")=="Gif"||ObjArray[i].getAttribute("ucctype")=="Apng"||ObjArray[i].getAttribute("ucctype")=="Label"){
       ObjArray[i].style.display="block";
    }
    else{
        console.log('error:'+ str+'操作对象不是button类型，此函数对其无作用');
    }
}
