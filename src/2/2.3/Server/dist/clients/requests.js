"use strict";
//http client--------------------------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
async function postDate() {
    const url = "http://localhost:3001/";
    const data = { username: "example" };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    const respJson = await response.json();
    console.log("---------------http");
    if (respJson.username === data.username) {
        console.log("yep, it is the same");
    }
    else {
        console.log("ou, not the same");
    }
}
postDate();
//udp client-----------------------------------------------------------------------
const dgram_1 = __importDefault(require("dgram"));
const client = dgram_1.default.createSocket('udp4');
const port = 3002;
const hostname = 'localhost';
const packet = Buffer.from('This is a message from client');
client.on('message', (message, info) => {
    // get the information about server address, port, and size of packet received.
    console.log('Address: ', info.address, 'Port: ', info.port, 'Size: ', info.size);
    //read message from server
    const packetServer = Buffer.from(message);
    console.log("--------------------udp");
    if (packetServer.toString() === packet.toString()) {
        console.log("yep, it is the same");
    }
    else {
        console.log("ou, not the same");
    }
    client.close();
});
client.send(packet, port, hostname, (err) => {
    if (err) {
        console.error('Failed to send packet !!');
    }
    else {
        console.log('Packet send !!');
    }
});
//tcp client------------------------------------------------------------
const net_1 = __importDefault(require("net"));
let dataForTest = "SomeInformation";
let clientTCP = new net_1.default.Socket();
clientTCP.connect(3003, 'localhost', function () {
    clientTCP.write(dataForTest);
});
clientTCP.on('data', function (data) {
    console.log('----------------tcp');
    if (data.toString() === dataForTest) {
        console.log("yep, it is the same");
    }
    else {
        console.log("ou, not the same");
    }
    clientTCP.end();
});
