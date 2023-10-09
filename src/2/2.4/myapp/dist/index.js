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
        const doubledLogin = yield User.find({ login: login }).exec();
        if (doubledLogin.length != 0) {
            console.log("login already registered");
        }
        else {
            const user = yield User.create({ login, password, tasks });
            console.log(`adds new user - ${user}`);
        }
    });
}
//----------------------------------------
//http server------------------------------------------------------
//need for correct procession of json
app.use(express_1.default.json());
//cors for use a frontend separately of back
app.use((0, cors_1.default)());
//use for start frontend with the back together 
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
app.get('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user === undefined) {
        if (!req.session.tasks) {
            req.session.tasks = [];
        }
        if (!req.session.uniqueCaunt) {
            req.session.uniqueCaunt = 1;
        }
        let resJson = { items: req.session.tasks };
        res.send(resJson);
    }
    else {
        try {
            const user = yield User.findOne({ login: req.session.user }).exec();
            if (user) {
                const resJson = { items: user.tasks };
                res.send(resJson);
            }
            else {
                res.status(404);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}));
app.post('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user === undefined) {
        const bodyReq = req.body;
        if (!req.session.tasks) {
            req.session.tasks = [];
        }
        if (!req.session.uniqueCaunt) {
            req.session.uniqueCaunt = 1;
        }
        const newTask = {
            id: req.session.uniqueCaunt,
            text: bodyReq.text,
            checked: false
        };
        req.session.tasks.push(newTask);
        req.session.uniqueCaunt++;
        const resJson = JSON.stringify({ id: newTask.id });
        res.send(resJson);
        console.log(`adds new task with id:${newTask.id}`);
    }
    else {
        const user = yield User.findOne({ login: req.session.user }).exec();
        if (!user.lastUniqueCount) {
            user.lastUniqueCount = 1;
        }
        const bodyReq = req.body;
        const newTask = {
            id: user.lastUniqueCount,
            text: bodyReq.text,
            checked: false
        };
        if (user) {
            user.tasks.push(newTask);
            user.lastUniqueCount++;
            yield user.save();
            const resJson = JSON.stringify({ id: newTask.id });
            res.send(resJson);
        }
        else {
            res.status(404);
        }
    }
}));
app.put('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reqBody = req.body;
    if (req.session.user === undefined) {
        const indexForUpdate = (_a = req.session.tasks) === null || _a === void 0 ? void 0 : _a.findIndex(task => task.id === reqBody.id);
        if (indexForUpdate !== -1 && req.session.tasks !== undefined && indexForUpdate !== undefined) {
            req.session.tasks[indexForUpdate] = reqBody;
            res.send({ "ok": true });
        }
        else {
            res.status(404);
        }
        console.log('put');
    }
    else {
        const user = yield User.findOne({ login: req.session.user }).exec();
        if (user) {
            const indexForUpdate = user.tasks.findIndex(task => task.id === reqBody.id);
            user.tasks[indexForUpdate] = reqBody;
            yield user.save();
            res.send({ "ok": true });
        }
        else {
            res.status(404);
        }
    }
}));
app.delete('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const reqBody = req.body;
    if (req.session.user === undefined) {
        const indexForUpdate = (_b = req.session.tasks) === null || _b === void 0 ? void 0 : _b.findIndex(task => task.id === reqBody.id);
        if (indexForUpdate !== -1 && req.session.tasks !== undefined && indexForUpdate !== undefined) {
            req.session.tasks.splice(indexForUpdate, 1);
            res.send({ "ok": true });
        }
        else {
            res.status(404);
        }
        console.log('deleted');
    }
    else {
        const user = yield User.findOne({ login: req.session.user }).exec();
        const indexForUpdate = user.tasks.findIndex(task => task.id === reqBody.id);
        console.log("index - " + indexForUpdate);
        if (indexForUpdate !== -1 && indexForUpdate !== undefined) {
            console.log("list - " + user.tasks);
            user.tasks.splice(indexForUpdate, 1);
            console.log("list after - " + user.tasks);
            yield user.save();
            res.send({ "ok": true });
        }
        else {
            res.status(404);
        }
    }
}));
app.post('/api/v1/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const login = (_c = req.body) === null || _c === void 0 ? void 0 : _c.login;
    const password = (_d = req.body) === null || _d === void 0 ? void 0 : _d.pass;
    const user = yield User.find({ login: login });
    if (!user) {
        return res.status(401).json({ message: 'Invalid login credentials' });
    }
    if (password === user[0].password) {
        req.session.user = user[0].login;
        res.send({ "ok": true });
    }
    else {
        console.log("password was not true");
    }
}));
app.post('/api/v1/register', (req, res) => {
    var _a, _b;
    const login = (_a = req.body) === null || _a === void 0 ? void 0 : _a.login;
    const password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.pass;
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
// function createNewItem(id:number,text:string,checked:boolean){
//     let newItem = new item(id, text, checked);
//     items.push(newItem);
//     return newItem;
// }
// class item {
//     id: number;
//     text: string;
//     checked: boolean;
//         constructor(id:number,text:string,checked:boolean){
//             this.id = id;
//             this.text = text;
//             this.checked = checked
//         }
// }
