"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dgram_1 = __importDefault(require("dgram"));
const net_1 = __importDefault(require("net"));
const app = (0, express_1.default)();
const portHTTP = 3001;
const portUDP = 3002;
const portTCP = 3003;
//http server------------------------------------------------------
//need for correct procession of json
app.use(express_1.default.json());
http_1.default.createServer(app).listen(portHTTP, () => {
    console.log("start HTTP express server");
});
//if open in browser for example
app.get('/', function (req, res) {
    console.log("get hy");
    res.send('GET request to the homepage');
});
app.post('/', function (req, res) {
    console.log("Have http POST requesr");
    console.log(`body: ${req.body}`);
    console.log("Create and send response");
    const reqJson = req.body;
    res.json({ username: reqJson === null || reqJson === void 0 ? void 0 : reqJson.username });
    res.end();
});
//udp server---------------------------------------------------------------------------------------
const udpServer = dgram_1.default.createSocket('udp4');
udpServer.on('error', (error) => {
    console.log("Error" + error);
    udpServer.close();
});
udpServer.on('message', (msg, rinfo) => {
    const line = msg.toString();
    console.log("Open UDP Conection");
    console.log(`Client information: address - ${rinfo.address}; port - ${rinfo.port}`);
    console.log("Client message - " + line);
    console.log("Create and send ansver");
    udpServer.send(line, rinfo.port, (error) => {
        if (error) {
            udpServer.close();
        }
        else {
            console.log("data send");
        }
    });
});
udpServer.bind(portUDP, () => {
    console.log(`start UDP server on ${portUDP} port`);
});
//tcp server-----------------------------------------------------------------------------------
const tcpServer = net_1.default.createServer();
tcpServer.listen(portTCP, 'localhost', () => {
    console.log("start TCP server");
});
tcpServer.on('connection', (socet) => {
    console.log(`create TCP connect; Client adress-${socet.address()}`);
    console.log("Send request");
    socet.on('data', (data) => {
        const dataString = data.toString();
        socet.write(dataString);
    });
});
