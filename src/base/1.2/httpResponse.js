const { test } = require("node:test");
const { text } = require("stream/consumers");

function readHttpLikeInput(){
    // см. предыдущую задачу
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
   
   function outputHttpResponse(statusCode, statusMessage, headers, body) {
    
       let text = `HTTP/1.1 ${statusCode} ${statusMessage}
Date: ${new Date}
Server: Apache/2.2.14 (Win32)
Content-Length: ${String(body).length}
Connection: Closed
Content-Type: text/html; charset=utf-8
`
text = text.concat(`\n${body}`)
       console.log(text);
   }
   
   function processHttpRequest($method, $uri, $headers, $body) {
       // ... проанализировать входящие данные, вычислить результат
       // и специальной командой красиво вывести ответ
       
        if($method === 'GET'){
            let uri = $uri.split("=").map(text => text.trim())
            if( uri[0].substring(0,4) === '/sum' )
            {   
                if(uri[0].substring(4,10) === '?nums='){
                    outputHttpResponse(400,'Bad Request',$headers,'bad request')
                }
                nums = uri[1].split(',');
                answ = nums.reduce((acum, actual) => {
                    return acum = +acum + +actual;
                })
                outputHttpResponse(200,'OK',$headers,answ)
                
            }
            else{
                outputHttpResponse(404,'Not Found',$headers,'not found')
            }
        }
        else{
            outputHttpResponse(400,'Bad Request',$headers,'bad request')
        }
      
   }
   
   function parseTcpStringAsHttpRequest($string) {
       // ну это вы уже написали
       stringSplit = $string.split("\n");

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
       bodyFromString = $string.split("\n\n")[1];
     
       
       return { 
         //method and url formation here
         method: stringSplit[0].split(" ")[0], 
         uri : stringSplit[0].split(" ")[1], 
         headers:  headersFromStr, 
         body : bodyFromString, 
       }; 
   }
   
   http = parseTcpStringAsHttpRequest(contents);
   http2 = parseTcpStringAsHttpRequest(
    `GET /sum?nums=1,2,3 HTTP/1.1
    Host: student.shpp.me
    `
   );
   processHttpRequest(http2.method,http2.uri, http2.headers, http2.body)
   console.log("================================")
   processHttpRequest(http.method, http.uri, http.headers, http.body);
   