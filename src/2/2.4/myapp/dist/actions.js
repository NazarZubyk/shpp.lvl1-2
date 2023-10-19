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
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLogout = exports.toRegister = exports.toLogin = exports.deleteItem = exports.editItems = exports.addItems = exports.getItems = void 0;
const mongoDBfunctions_1 = require("./mongoDBfunctions");
const express_validator_1 = require("express-validator");
const User = require('./userForDB');
function getItems(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ "error": "bad request" });
            }
            console.log((_a = req.session) === null || _a === void 0 ? void 0 : _a.user);
            if (((_b = req.session) === null || _b === void 0 ? void 0 : _b.user) === undefined) {
                if (!((_c = req.session) === null || _c === void 0 ? void 0 : _c.tasks)) {
                    req.session.tasks = [];
                }
                if (!req.session.uniqueCaunt) {
                    req.session.uniqueCaunt = 1;
                }
                let resJson = JSON.stringify({ items: req.session.tasks });
                res.send(resJson);
            }
            else {
                const user = yield User.findOne({ login: req.session.user }).exec();
                if (user) {
                    const resJson = { items: user.tasks };
                    res.send(resJson);
                }
                else {
                    res.status(404).json({ "error": `cannot finde ${req.session.user} in datdbase` });
                }
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ "error": "fatal server error in get-'/api/v1/items'" });
        }
    });
}
exports.getItems = getItems;
function addItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ "error": "bad request" });
            }
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
                    res.status(404).json({ error: "cannot found user" });
                }
            }
        }
        catch (error) {
            res.status(500).json({ "error": "fatal server error in post'/api/v1/items'" });
        }
    });
}
exports.addItems = addItems;
function editItems(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ "error": "bad request" });
            }
            const reqBody = req.body;
            if (req.session.user === undefined) {
                const indexForUpdate = (_a = req.session.tasks) === null || _a === void 0 ? void 0 : _a.findIndex(task => task.id === reqBody.id);
                if (indexForUpdate !== -1 && req.session.tasks !== undefined && indexForUpdate !== undefined) {
                    req.session.tasks[indexForUpdate] = reqBody;
                    res.send({ "ok": true });
                }
                else {
                    res.status(404).json({ "message": "item by index cannot be found" });
                }
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
                    res.status(404).json({ "message": "item by index cannot be found" });
                }
            }
        }
        catch (error) {
            res.status(500).json({ "error": "fatal server error in put('/api/v1/items'" });
        }
    });
}
exports.editItems = editItems;
function deleteItem(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ "error": "bad request" });
            }
            const reqBody = req.body;
            if (req.session.user === undefined) {
                const indexForUpdate = (_a = req.session.tasks) === null || _a === void 0 ? void 0 : _a.findIndex(task => task.id === reqBody.id);
                if (indexForUpdate !== -1 && req.session.tasks !== undefined && indexForUpdate !== undefined) {
                    req.session.tasks.splice(indexForUpdate, 1);
                    res.send({ "ok": true });
                }
                else {
                    res.status(404).json({ "message": "item by index cannot be found" });
                }
            }
            else {
                const user = yield User.findOne({ login: req.session.user }).exec();
                const indexForUpdate = user.tasks.findIndex(task => task.id === reqBody.id);
                if (indexForUpdate !== -1 && indexForUpdate !== undefined) {
                    user.tasks.splice(indexForUpdate, 1);
                    yield user.save();
                    res.send({ "ok": true });
                }
                else {
                    res.status(404).json({ "message": "item by index cannot be found" });
                }
            }
        }
        catch (error) {
            res.status(500).json({ "error": "fatal server error in delete('/api/v1/items'" });
        }
    });
}
exports.deleteItem = deleteItem;
function toLogin(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ "error": "bad request" });
            }
            const login = (_a = req.body) === null || _a === void 0 ? void 0 : _a.login;
            const password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.pass;
            const user = yield User.find({ login: login });
            if (!user) {
                return res.status(401).json({ message: 'Invalid login credentials' });
            }
            if (password === user[0].password) {
                req.session.user = user[0].login;
                res.send({ "ok": true });
            }
            else {
                res.status(401).json({ "error": "wrong password" });
            }
        }
        catch (error) {
            res.status(500).json({ "error": "fatal server error in post('/api/v1/login'" });
        }
    });
}
exports.toLogin = toLogin;
function toRegister(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ "error": "bad request" });
            }
            const login = (_a = req.body) === null || _a === void 0 ? void 0 : _a.login;
            const password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.pass;
            const tasks = [];
            (0, mongoDBfunctions_1.addNewUserToBD)(login, password, tasks);
            res.send({ "ok": true });
        }
        catch (error) {
            res.status(500).json({ "error": "fatal server error in post('/api/v1/register'" });
        }
    });
}
exports.toRegister = toRegister;
function toLogout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ "error": "bad request" });
            }
            req.session.destroy((err) => {
                console.log(err);
            });
            res.send({ 'ok': true });
        }
        catch (error) {
            res.status(500).json({ "error": "fatal server error in post('/api/v1/logout'" });
        }
    });
}
exports.toLogout = toLogout;
//# sourceMappingURL=actions.js.map