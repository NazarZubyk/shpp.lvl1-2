"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
var bodyParser = require('body-parser');
const portHTTP = 3005;
//http server------------------------------------------------------
//need for correct procession of json
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('frontend'));
const FileStore = require('session-file-store')(express_session_1.default);
app.use((0, express_session_1.default)({
    store: new FileStore({}),
    secret: 'someLongSecretKayrjdncijewnfdi3jnd3n5j35n4k32jn4n',
    resave: true,
    saveUninitialized: true,
}));
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
    console.log(req.sessionID);
    idCount++;
});
app.put('/api/v1/items', (req, res) => {
    let reqBody = req.body;
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
    let reqBody = req.body;
    let indexForUpdate = items.findIndex(item => item.id === reqBody.id);
    if (indexForUpdate !== -1) {
        //delete item here by index
        items.splice(indexForUpdate, 1);
        res.send({ "ok": true });
    }
    else {
        res.status(404);
    }
    console.log('delete/');
});
app.post('/api/v1/login', (req, res) => {
    var _a, _b;
    console.log(req.session);
    let log = (_a = req.body) === null || _a === void 0 ? void 0 : _a.login;
    let password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.pass;
    FileStore;
});
app.post('/api/v1/register', (req, res) => {
    var _a, _b;
    const fs = require('fs');
    let login = (_a = req.body) === null || _a === void 0 ? void 0 : _a.login;
    let password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
    fs.writeFile('users/bd.txt', login + " " + password, (err) => {
        if (err)
            throw err;
        else {
            console.log("The file is updated with the given data");
        }
    });
    res.send({ "ok": true });
});
app.post('/api/v1/logout', (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
    });
    res.send({ 'ok': true });
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
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://127.0.0.1:32768/test');
