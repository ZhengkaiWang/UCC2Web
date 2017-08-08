function GetCursorPos(Str) {

  if (DividePoint(Str,'=')!==-1) {
    var RightStr = Str.slice(DividePoint(Str,'=')+1,Str.length);
    var RtnObj = ucctojs(Str.slice(0,DividePoint(Str,'=')));
    if(RightStr==="x"){
      RtnObj.varContent = event.clientX;
    }else if (RightStr==="y") {
      RtnObj.varContent = event.clientY;
    }else if (RightStr==="/") {
      RtnObj.varContent = event.clientX + "/" + event.clientY;
    }else {
      //throwerror();
      alert("GetCursorPos()代码写错了= =")
    }
  } else {
    var RtnObj = ucctojs(Str);
    RtnObj.varContent = event.clientX + "/" + event.clientY;
  }
  push(RtnObj);
}

function ColorBrowse(Str) {
  var Obj = window.event.target;
  $(Obj).colpick({
      layout:'full',
                  //布局样式，'full'(RGB, HEX, and HSB fields),'rgbhex' (no HSB fields) and hex(no HSB, no rgb)
                  //三种，默认为full，一般使用hex即可。
      submit:true,
                  //是否显示OK提交按钮，如果为true显示选择器上显示实时值的框会分半，一半显示下边color属性旧颜色，
                  // 一半显示实时新颜色。
      colorScheme:'light',
                  //配色方案，有light和dark可选，dark有点黑不太合适。默认为light。
      color:'0066CC',
                  //默认显示颜色，程序有自己默认的值，官网说法是11ff00。前面的#可写可不写。
      showEvent:'click',
                  //触发事件，默认为click。
      onChange:function(hsb,hex,rgb,el,bySetColor) {
                  //颜色改变时触发的函数，前面三个是改变着的颜色的实时值。el为调用colpick函数的DOM对象，
                  // 比如默认例子中的input框。最后一个，如果为true表示onChange回调函数是通过colpickSetColor函数
                  // (看下边的keyup事件)触发的，而不是由用户直接操作选择器改变颜色值触发。
          if(!bySetColor) $(el).val(hex);
                  //不是colpickSetColor函数触发的，则为用户通过选择器改变颜色触发的，实时显示到input框。想把实时
                  // 值显示到其他地方，找到相应节点即可。
      }
  }).keyup(function(){
      $(this).colpickSetColor(this.value);
                  //colpickSetColor是插件为jquery扩充的函数，可用来设置选择器的颜色，就是手动更改颜色值时下边的
                  // 选择器的颜色值跟着变
  })
  var RtnObj = ucctojs(Str);
  RtnObj.varContent = Obj.value;
  push(RtnObj);
  console.log(RtnObj);
}

function Clipboard(Str) {
  //Chrome 暂不支持对剪切板的访问
}

function Exit() {
  //Chrome Safari Firefox不支持 只能关闭js自己打开的窗口
  // 此处通过清空窗口来间接实现
  var Form = ucctojs("Me");
  var Body = Form.parentNode;
  Body.remove(Form);
}
