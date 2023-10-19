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
const actions_1 = require("../actions");
const express_validator_1 = require("express-validator");
const router2 = express_1.default.Router();
router2.all('/api/v2/router', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const action = req.query.action;
        console.log(action);
        switch (action) {
            case 'login':
                {
                    yield (0, actions_1.toLogin)(req, res);
                    break;
                }
            case 'logout': {
                yield (0, actions_1.toLogout)(req, res);
                break;
            }
            case undefined: {
                yield (0, actions_1.toLogout)(req, res);
                break;
            }
            case 'register': {
                yield (0, express_validator_1.check)('login').notEmpty().run(req);
                yield (0, express_validator_1.check)('pass').notEmpty().run(req);
                yield (0, actions_1.toRegister)(req, res);
                break;
            }
            case 'getItems': {
                yield (0, actions_1.getItems)(req, res);
                break;
            }
            case 'deleteItem': {
                yield (0, express_validator_1.check)('id').notEmpty().isNumeric().run(req);
                yield (0, actions_1.deleteItem)(req, res);
                break;
            }
            case 'createItem': {
                yield (0, express_validator_1.check)('text').notEmpty().run(req);
                yield (0, actions_1.addItems)(req, res);
                break;
            }
            case 'editItem':
                {
                    yield (0, express_validator_1.check)('text').notEmpty().run(req);
                    yield (0, express_validator_1.check)('id').notEmpty().run(req);
                    yield (0, express_validator_1.check)('checked').notEmpty().isBoolean().run(req);
                    yield (0, actions_1.editItems)(req, res);
                    break;
                }
                defaul: res.status(400).json({ "error": "bad request" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ "error": "fatal server error" });
    }
}));
exports.default = router2;
//# sourceMappingURL=v2.js.map