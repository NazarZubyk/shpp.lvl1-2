
   
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
  if($method === 'GET'){
      try{
        let path = require('path');
        if($uri === '/'){
          let uploadedFile = require("fs").readFileSync("index.html",'utf-8')
          outputHttpResponse(200,'OK',$headers, uploadedFile)
        }
        else if ($headers['Host'] === 'student.shpp.me'){
          let correctPath = `src\\base\\1.2\\1.2.5\\student${$uri}`
          let uploadedFile = require("fs").readFileSync(correctPath,'utf-8')
          outputHttpResponse(200,'OK',$headers, uploadedFile)
        }
        else if ($headers['Host'] === 'another.shpp.me'){
          let correctPath = `src\\base\\1.2\\1.2.5\\another${$uri}`
          let uploadedFile = require("fs").readFileSync(correctPath,'utf-8')
          outputHttpResponse(200,'OK',$headers, uploadedFile)
        }
        else{
          outputHttpResponse(404,'Not Found',$headers,'<h1 style="color:red">Not Found</h1>')
        }
      }
      catch(e){
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

   
   http2 = parseTcpStringAsHttpRequest(
    `GET /testFile.txt HTTP/1.1
    Accept: */*
    Host: student.shpp.me
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/4.0
    Content-Length: 35
    
    login=student&password=12345
    `
   )
   processHttpRequest(http2.method, http2.uri, http2.headers, http2.body);
   