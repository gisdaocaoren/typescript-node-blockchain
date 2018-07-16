export class Util {
  /**
   *@description:将string转为UTF-8格式signed char字节数组
  *
  */
  public static stringToBytes(str){
    var bytes = new Array();
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      var s = parseInt(c).toString(2);
      if(c >= parseInt("000080",16) && c <= parseInt("0007FF",16)){
        var af = "";
        for(var j = 0; j < (11 - s.length); j++){
          af += "0";
        }
        af += s;
        var n1 = parseInt("110" + af.substring(0,5),2);
        var n2 = parseInt("110" + af.substring(5),2);
        if(n1 > 127) n1 -= 256;
        if(n2 > 127) n2 -= 256;
        bytes.push(n1);
        bytes.push(n2);
      }else if(c >= parseInt("000800",16) && c <= parseInt("00FFFF",16)){
        var af = "";
        for(var j = 0; j < (16 - s.length); j++){
          af += "0";
        }
        af += s;
        var n1 = parseInt("1110" + af.substring(0,4),2);
        var n2 = parseInt("10" + af.substring(4,10),2);
        var n3 = parseInt("10" + af.substring(10),2);
        if(n1 > 127) n1 -= 256;
        if(n2 > 127) n2 -= 256;
        if(n3 > 127) n3 -= 256;
        bytes.push(n1);
        bytes.push(n2);
        bytes.push(n3);
      }else if(c >= parseInt("010000",16) && c <= parseInt("10FFFF",16)){
        var af = "";
        for(var j = 0; j < (21 - s.length); j++){
          af += "0";
        }
        af += s;
        var n1 = parseInt("11110" + af.substring(0,3),2);
        var n2 = parseInt("10" + af.substring(3,9),2);
        var n3 = parseInt("10" + af.substring(9,15),2);
        var n4 = parseInt("10" + af.substring(15),2);
        if(n1 > 127) n1 -= 256;
        if(n2 > 127) n2 -= 256;
        if(n3 > 127) n3 -= 256;
        if(n4 > 127) n4 -= 256;
        bytes.push(n1);
        bytes.push(n2);
        bytes.push(n3);
        bytes.push(n4);
      }else{
        bytes.push(c & 0xff);
      }
    }
    return bytes;
  }
}