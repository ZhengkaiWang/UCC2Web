
function LinkString(str) {

  var RtnStr = str.slice(0,DividePoint(str,'='));
  var RtnObj = ucctojs(RtnStr);
  str = str.slice(DividePoint(str,'=')+1,str.length);

  var sonStrArray = new Array();
  var sonObjArray = new Array();
  var i = 0;
  RtnObj.varContent="";
  while (str.search(/,/)!==-1) {
    sonObjArray[i] = ucctojs(str.slice(0,DividePoint(str,',')));
    RtnObj.varContent += sonObjArray[i].varContent
    i++;
    str = str.slice(DividePoint(str,',')+1,str.length);
  }
  sonObjArray[i] = ucctojs(str);
  RtnObj.varContent += sonObjArray[i].varContent;
  push(RtnObj);
}
//js的函数语句处理形式为：GetAsc:'asefsd','-';结果与ucc中的GetAsc:asefsd,-;结果
 function GetAsc(Str){
    Str += ',';
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    if(Str.search(/,/)!==-1&&Str.slice(DividePoint(Str,',')+1,Str.length)!==""){
        //等号右边以逗号隔开
         var Str2 =  ucctojs(Str.slice(DividePoint(Str,',')+1,Str.length));
         var Str1 = ucctojs(Str.slice(0,DividePoint(Str,',')));
         for(var i = 0; i<Str1.varContent.length;i++) {
             RtnObj.varContent+=Str1.varContent.charCodeAt(i);
              if(i<Str1.varContent.length-1){
                   RtnObj.varContent += Str2.varContent;
              }
         }
      }
    else{
        Str = ucctojs(Str);
        for(var i = 0; i<Str.varContent.length;i++) {
            RtnObj.varContent+=Str.varContent.charCodeAt(i);
             if(i<Str.varContent.length-1){
                  RtnObj.varContent += "-";
             }
        }
    }
    push(RtnObj);
}

function GetChr(Str){
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    Str=ucctojs(Str);
    RtnObj.varContent=String.fromCharCode(Str.varContent);
    push(RtnObj);
}

function Replace(Str){
    Str += ',';
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    var sonObjArray = new Array();
    var i=0;
    while (DividePoint(Str,',')!==-1) {
      sonObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
  if (sonObjArray.length<3) {
      RtnObj.varContent = sonObjArray[0].varContent;
  }else {
      RtnObj.varContent = sonObjArray[0].varContent.replace(new RegExp(sonObjArray[1].varContent,"gm"),sonObjArray[2].varContent);
  }
    push(RtnObj);

   }

function InsertString(Str) {
    Str += ',';
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    var sonObjArray = new Array();
    var i=0;
    while (DividePoint(Str,',')!==-1) {
      sonObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
  //如果参数输入不全，或者插入位置等于0，或者大于字符长度，返回原值
  if (sonObjArray.length<3||sonObjArray[2].varContent==0||sonObjArray[2].varContent>sonObjArray[0].varContent.length) {
      RtnObj.varContent = sonObjArray[0].varContent;
  }else {
      str1 = sonObjArray[0].varContent.slice(0,sonObjArray[2].varContent);
      str2 = sonObjArray[0].varContent.slice(sonObjArray[2].varContent) ;
      RtnObj.varContent =str1+sonObjArray[1].varContent+str2;
  }
    push(RtnObj);
}

function GetPartOfString(Str){
    Str += ',';
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    var sonObjArray = new Array();
    var i=0;
    while (DividePoint(Str,',')!==-1) {
      sonObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
  if (sonObjArray.length<3) {
      RtnObj.varContent = sonObjArray[0].varContent;
  }
  //GetPartOfString:var='Expression',Start, Count类型
  else if(typeof(sonObjArray[1].varContent)=='number'){
      //起始位置必须在字符串长度之间
      if(sonObjArray[1].varContent>0&&sonObjArray[1].varContent<=sonObjArray[0].varContent.length){
          RtnObj.varContent =sonObjArray[0].varContent.substr(sonObjArray[1].varContent-1,sonObjArray[2].varContent);
      }
      else{
           RtnObj.varContent = sonObjArray[0].varContent;
      }
  }
  //GetPartOfString:var='Expression','Delimiter',Option类型
  else if (typeof(sonObjArray[1].varContent)=='string') {
       var strArray = sonObjArray[0].varContent.split(sonObjArray[1].varContent);
       if (typeof(sonObjArray[2].varContent)=='number') {
           if(sonObjArray[2].varContent>0&&sonObjArray[2].varContent<=strArray.length){
                RtnObj.varContent = strArray[sonObjArray[2].varContent-1];
           }else{
               RtnObj.varContent = "";
           }
       }
       else if(sonObjArray[2].varContent.toLowerCase()=='first'){
          RtnObj.varContent = strArray[0];
       }

       else if (sonObjArray[2].varContent.toLowerCase()=='last') {
            RtnObj.varContent = strArray[strArray.length-1];
       }

       else{
            RtnObj.varContent = sonObjArray[0].varContent;
       }
  }
    push(RtnObj);
}
//所有情况根据ucc相应情况输出，无报错，
function FindString(Str){
    Str += ',';
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    var sonObjArray = new Array();
    var i=0;
    while (DividePoint(Str,',')!==-1) {
        if(Str.slice(0,DividePoint(Str,','))==""){
            break;
        }
      sonObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
  if (sonObjArray.length==0) {
      RtnObj.varContent = 0;
  }else if(sonObjArray.length==1) {
      RtnObj.varContent = 1;
  }else if (sonObjArray.length==2) {
      RtnObj.varContent = sonObjArray[0].varContent.indexOf(sonObjArray[1].varContent)+1;
  }
  else {
      if(sonObjArray[2].varContent>sonObjArray[0].varContent.length||sonObjArray[2].varContent==0){
           RtnObj.varContent = sonObjArray[0].varContent.indexOf(sonObjArray[1].varContent)+1;
      }else if (sonObjArray[2].varContent==-1) {
          RtnObj.varContent = sonObjArray[0].varContent.lastIndexOf(sonObjArray[1].varContent)+1;
      }else if (sonObjArray[2].varContent<-1) {
           RtnObj.varContent="";
      }else{
           RtnObj.varContent = sonObjArray[0].varContent.indexOf(sonObjArray[1].varContent,sonObjArray[2].varContent-1)+1;
      }

  }

    push(RtnObj);

}

//所有情况根据ucc相应情况输出，无报错，
function LengthOFString(Str){
    Str += ',';
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    var sonObjArray = new Array();
    var i=0;
    while (DividePoint(Str,',')!==-1) {
        if(Str.slice(0,DividePoint(Str,','))==""){
            break;
        }
      sonObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
  if (sonObjArray.length==0) {
      RtnObj.varContent = 0;
  }else if(sonObjArray.length==1) {
      RtnObj.varContent = sonObjArray[0].varContent.replace(/[\u0391-\uFFE5]/g,"aa").length;
  }else if(sonObjArray.length>=2) {
      if(sonObjArray[0].varContent.toLowerCase()=='single'){
           RtnObj.varContent = sonObjArray[1].varContent.length;
      }else if (sonObjArray[0].varContent.toLowerCase()=='double') {
          RtnObj.varContent = sonObjArray[1].varContent.length*2;
      }else if (sonObjArray[0].varContent.toLowerCase()=='mix') {
            RtnObj.varContent = sonObjArray[1].varContent.replace(/[\u0391-\uFFE5]/g,"aa").length;
      }else{
           RtnObj.varContent = sonObjArray[1].varContent.replace(/[\u0391-\uFFE5]/g,"aa").length;
      }

  }

    push(RtnObj);

}

function FillString(Str){
	Str += ',';
    var RtnStr = Str.slice(0,DividePoint(Str,'='));
    var RtnObj = ucctojs(RtnStr);
    Str = Str.slice(DividePoint(Str,'=')+1,Str.length);
    var sonObjArray = new Array();
    var i=0;
    while (DividePoint(Str,',')!==-1) {
        if(Str.slice(0,DividePoint(Str,','))==""){
            break;
        }
      sonObjArray[i] = ucctojs(Str.slice(0,DividePoint(Str,',')));
      i++;
      Str = Str.slice(DividePoint(Str,',')+1,Str.length);
  }
  if (sonObjArray.length<3||typeof(sonObjArray[1].varContent)!='number') {
	  if(sonObjArray.length<1){
		  RtnObj.varContent = "";
	  }else{
		  RtnObj.varContent = sonObjArray[0].varContent;
	  }
      
  }else if(sonObjArray.length==3) {
	  var length2 = sonObjArray[1].varContent-sonObjArray[0].varContent.length;
	  RtnObj.varContent = sonObjArray[0].varContent;
	  for(var i = 0;i<length2;i++){
		  RtnObj.varContent = RtnObj.varContent+sonObjArray[2].varContent;
	  }
 }else if(sonObjArray.length>3) {
     if(sonObjArray[3].varContent===1){
		  var length2 = sonObjArray[1].varContent-sonObjArray[0].varContent.length;
	      RtnObj.varContent = sonObjArray[0].varContent;
		  for(var i = 0;i<length2;i++){
			  RtnObj.varContent = sonObjArray[2].varContent+RtnObj.varContent;
		  } 
	 }
	  else{
		  var length2 = sonObjArray[1].varContent-sonObjArray[0].varContent.length;
		  RtnObj.varContent = sonObjArray[0].varContent;
		  for(var i = 0;i<length2;i++){
			  RtnObj.varContent = RtnObj.varContent+sonObjArray[2].varContent;
		  }  
	  }

  }

    push(RtnObj);
}
