"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    lastUniqueCount: Number,
    login: String,
    password: String,
    tasks: []
});
module.exports = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=userForDB.js.map