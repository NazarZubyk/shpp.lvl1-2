"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const mongoURL = 'mongodb://127.0.0.1:32768';
const app = (0, express_1.default)();
const portHTTP = 3005;
//mongo part------------------------------
const mongoose_1 = __importDefault(require("mongoose"));
const User = require('./user');
mongoose_1.default.connect(mongoURL);
function addNewUserToBD(login, password, tasks) {
    return __awaiter(this, void 0, void 0, function* () {
        const some = yield User.find({ login: login }).exec();
        if (some.length != 0) {
            console.log("assssssssssssss");
        }
        else {
            console.log("somesing new --------------------------------------------");
        }
        const user = yield User.create({ login, password, tasks });
        console.log(`adds new user - ${user}`);
    });
}
//----------------------------------------
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
});
app.post('/api/v1/register', (req, res) => {
    var _a, _b;
    const login = (_a = req.body) === null || _a === void 0 ? void 0 : _a.login;
    const password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.pass;
    console.log(`log + ${login}, pas - ${password}`);
    const tasks = [];
    addNewUserToBD(login, password, tasks);
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
