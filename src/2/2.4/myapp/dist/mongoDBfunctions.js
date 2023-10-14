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
exports.addNewUserToBD = void 0;
const User = require('./user');
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
exports.addNewUserToBD = addNewUserToBD;
