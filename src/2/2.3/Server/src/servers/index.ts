import express from 'express'
import http from 'http'
import dgram from 'dgram'
import net from 'net'

const app = express()
const portHTTP = 3001;
const portUDP = 3002;
const portTCP = 3003;


//http server------------------------------------------------------

//need for correct procession of json
app.use(express.json());

http.createServer(app).listen(portHTTP,()=>{
  console.log("start HTTP express server")
})

//if open in browser for example
app.get('/', function (req, res) {
    console.log("get hy")
    res.send('GET request to the homepage');
  });
  
  
app.post('/', function (req, res) {
    console.log("Have http POST requesr")
    console.log(`body: ${req.body}`)
    console.log("Create and send response")
  const reqJson = req.body;
    res.json({username : reqJson?.username});
    res.end();
  });

  //udp server---------------------------------------------------------------------------------------

const udpServer = dgram.createSocket('udp4')

udpServer.on('error',(error)=>{
  console.log("Error"+error)
  udpServer.close();
})

udpServer.on('message',(msg, rinfo)=>{
  
  const line = msg.toString();
  console.log("Open UDP Conection")
  console.log(`Client information: address - ${rinfo.address}; port - ${rinfo.port}`)
  console.log("Client message - " + line);
  console.log("Create and send ansver")
  
    udpServer.send(line,rinfo.port,(error)=>{
    if(error){
      udpServer.close()
    }
    else{
      console.log("data send")
    }
  })
});

udpServer.bind(portUDP,()=>{
  console.log(`start UDP server on ${portUDP} port`)
})

//tcp server-----------------------------------------------------------------------------------

const tcpServer = net.createServer();

tcpServer.listen(portTCP,'localhost',()=>{
  console.log("start TCP server")
})

tcpServer.on('connection',(socet)=>{
  console.log(`create TCP connect;`)
  console.log("Send request")
  socet.on('data',(data)=>{
    const dataString = data.toString();
    socet.write(dataString);
    
  })
  

})