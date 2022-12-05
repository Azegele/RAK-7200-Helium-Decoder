function Decoder(bytes, port) {
    var decoded = {};
    var hexString=bin2HexStr(bytes);
    return rakSensorDataDecode(hexString);
  }
  
  // convert array of bytes to hex string.
  function bin2HexStr(bytesArr) {
    var str = "";
    for(var i=0; i<bytesArr.length; i++) {
      var tmp = (bytesArr[i] & 0xff).toString(16);
      if(tmp.length == 1) {
        tmp = "0" + tmp;
      }
      str += tmp;
    }
    return str;
  }
  
  // convert string to short integer
  function parseShort(str, base) {
    var n = parseInt(str, base);
    return (n << 16) >> 16;
  }
  
  // convert string to triple bytes integer
  function parseTriple(str, base) {
    var n = parseInt(str, base);
    return (n << 8) >> 8;
  }
  
  // decode Hex sensor string data to object
  function rakSensorDataDecode(hexStr) {
    var str = hexStr;
    var myObj = {};
  
    while (str.length > 4) {
      var flag = parseInt(str.substring(0, 4), 16);
      switch (flag) {
        case 0x0188:// GPS
          myObj.latitude = parseFloat((parseTriple(str.substring(4, 10), 16) * 0.0001).toFixed(4)) ;
          myObj.longitude = parseFloat((parseTriple(str.substring(10, 16), 16) * 0.0001).toFixed(4)) ;
          myObj.altitude = parseFloat((parseTriple(str.substring(16, 22), 16) * 0.01).toFixed(0)) ;
          myObj.accuracy = 3
          str = str.substring(22);
          break;
        default:
          str = str.substring(7);
          break;
      }
    }
  
    return myObj;
  }