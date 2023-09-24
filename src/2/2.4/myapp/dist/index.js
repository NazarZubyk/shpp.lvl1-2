"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
var bodyParser = require('body-parser');
const portHTTP = 3005;
//http server------------------------------------------------------
//need for correct procession of json
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('frontend'));
http_1.default.createServer(app).listen(portHTTP, () => {
    console.log("start HTTP express server");
});
let idCount = 1;
let items = [];
app.get('/api/v1/items', (req, res) => {
    let resJson = { items: items.map(item => ({ id: item.id, text: item.text, checked: item.checked })) };
    res.send(resJson);
});
app.post('/api/v1/items', (req, res) => {
    let bodyReq = req.body;
    console.log(bodyReq.text);
    let newItem = createNewItem(idCount, bodyReq.text, false);
    let resJson = JSON.stringify({ id: newItem.id });
    res.send(resJson);
    console.log(`post with id:${newItem.id}`);
    idCount++;
});
app.put('/api/v1/items', (req, res) => {
    let reqBody = req.body;
    console.log(reqBody);
    let indexForUpdate = items.findIndex(item => item.id === reqBody.id);
    if (indexForUpdate !== -1) {
        items[indexForUpdate] = reqBody;
        res.send({ "ok": true });
    }
    else {
        res.status(404);
    }
    //let newItem = createNewItem(reqJSON.id,reqJSON.text,reqJSON.checked)
    console.log('put');
});
app.delete('/api/v1/items', (req, res) => {
    console.log('delete/');
});
function createNewItem(id, text, checked) {
    let newItem = new item(id, text, checked);
    items.push(newItem);
    return newItem;
}
class item {
    constructor(id, text, checked) {
        this.id = id;
        this.text = text;
        this.checked = checked;
    }
}
