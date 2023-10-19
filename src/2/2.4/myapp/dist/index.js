"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const v1_1 = __importDefault(require("./api/v1"));
const v2_1 = __importDefault(require("./api/v2"));
const mongoose_1 = __importDefault(require("mongoose"));
const configuration_1 = require("./configuration");
const FileStore = require('session-file-store')(express_session_1.default);
const app = (0, express_1.default)();
mongoose_1.default.connect(configuration_1.mongoURL);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1', v1_1.default);
app.use('/', v2_1.default);
app.use(express_1.default.static('frontend'));
app.use((0, express_session_1.default)({
    store: new FileStore({}),
    secret: 'fwefweeeeeeeeeeeeeeeeeeee',
    resave: true,
    saveUninitialized: true,
}));
http_1.default.createServer(app).listen(configuration_1.portHTTP, () => {
    console.log("start HTTP express server");
});
//# sourceMappingURL=index.js.map