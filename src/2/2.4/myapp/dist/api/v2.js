"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const actions_1 = require("../actions");
const router = express_1.default.Router();
try {
    router.route('/items')
        .get(actions_1.getItems)
        .post(actions_1.addItems)
        .put(actions_1.editItems)
        .delete(actions_1.deleteItem);
    router.route('/login')
        .post(actions_1.toLogin);
    router.route('/register')
        .post(actions_1.toRegister);
    router.route('/logout')
        .post(actions_1.toLogout);
}
catch (error) {
    console.error(error);
}
exports.default = router;
