"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const actions_1 = require("../actions");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
try {
    router.route('/items')
        .get(actions_1.getItems)
        .post([
        (0, express_validator_1.body)('text').notEmpty().isString()
    ], actions_1.addItems)
        .put([
        (0, express_validator_1.body)('text').notEmpty().isString(),
        (0, express_validator_1.body)('id').notEmpty().isNumeric(),
        (0, express_validator_1.body)('checked').notEmpty().isBoolean()
    ], actions_1.editItems)
        .delete([
        (0, express_validator_1.body)('id').notEmpty().isNumeric()
    ], actions_1.deleteItem);
    router.route('/login')
        .post([
        (0, express_validator_1.body)('login').notEmpty(),
        (0, express_validator_1.body)('pass').notEmpty()
    ], actions_1.toLogin);
    router.route('/register')
        .post([
        (0, express_validator_1.body)('login').notEmpty(),
        (0, express_validator_1.body)('pass').notEmpty()
    ], actions_1.toRegister);
    router.route('/logout')
        .post(actions_1.toLogout);
}
catch (error) {
    console.error(error);
}
exports.default = router;
