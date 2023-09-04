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
       
        if($method === 'POST'){
            
            if( $uri === '/api/checkLoginAndPassword' )
            {
                if( $headers['Content-Type'] === 'application/x-www-form-urlencoded' ){
                    try{
                        let loginAndPassword = getLogAndPassword($body)
                        let passwordsList = require("fs").readFileSync("passwords.txt",'utf-8')

                        passwordsList = passwordsList.split('\r\n');
                        
                        for(logAndPass of passwordsList){
                            if(loginAndPassword === logAndPass){
                                outputHttpResponse( 200 , 'OK' , $headers , '<h1 style="color:green">FOUND</h1>');
                                return 0;
                        }
                    } 
                    outputHttpResponse( 200 , 'OK' , $headers , '<h1 style="color:red">NOT FOUND</h1>');
                    }
                    catch(e){
                        outputHttpResponse( 500 , 'Internal Server Error' , $headers , '<h1 style="color:red">Internal Server Error</h1>');
                    }
                }   
                else{
                    outputHttpResponse(400,'Bad Request',$headers,'<h1 style="color:red">Bad Request</h1>')
                }  
            }
            else{
                outputHttpResponse(404,'Not Found',$headers,'<h1 style="color:red">Not Found</h1>')
            }
        }
        else{
            outputHttpResponse(400,'Bad Request',$headers,'<h1 style="color:red">Bad Request</h1>')
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
   
function getLogAndPassword(body){
    body = body.split('&')
    .map(line => line.split('='))

    if(body[0][0] === 'login' && body[1][0] === 'password'){
        return `${body[0][1]}:${body[1][1]}`;
    }

}

   http = parseTcpStringAsHttpRequest(contents);
   http2 = parseTcpStringAsHttpRequest(
    `POST /api/checkLoginAndPassword HTTP/1.1
    Accept: */*
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/4.0
    Content-Length: 35
    
    login=student&password=12345
    `
   )
   processHttpRequest(http.method, http.uri, http.headers, http.body);
   