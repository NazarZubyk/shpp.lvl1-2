
   
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
    `POST /api/checkLoginAndPassword HTTP/1.1
    Accept: */*
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/4.0
    Content-Length: 35
    
    login=student&password=12345
    `
   )
   processHttpRequest(http.method, http.uri, http.headers, http.body);
   