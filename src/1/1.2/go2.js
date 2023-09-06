// этот файл надо будет дописать...

// не обращайте на эту функцию внимания 
// она нужна для того чтобы правильно читать входные данные
function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10) 
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

// вот эту функцию собственно надо написать
function parseTcpStringAsHttpRequest(string) { 
  stringSplit = string.split("\n");

  //formation of headers
  headersFromStr = stringSplit
  .filter(text => text?.includes(":"))
  .reduce((acum, actual)=>{
    actualSplited = actual.split(":")
    .map(cell=> cell.trim());
    acum[actualSplited[0]] = actualSplited[1];
    return acum;
  },{})
  
  //formation of body
  bodyFromString = string.split("\n\n")[1];

  
  return { 
    //method and url formation here
    method: stringSplit[0].split(" ")[0], 
    uri : stringSplit[0].split(" ")[1], 
    headers:  headersFromStr, 
    body : bodyFromString, 
  }; 
}

http = parseTcpStringAsHttpRequest(contents); 
console.log(JSON.stringify(http, undefined, 2));