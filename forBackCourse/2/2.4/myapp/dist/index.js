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
1;
const FileStore = require('session-file-store')(express_session_1.default);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://127.0.0.1:8000',
    credentials: true,
}));
if (configuration_1.mongoURL === undefined) {
    console.error('Cannot connect to the database.');
}
else {
    mongoose_1.default.connect(configuration_1.mongoURL);
}
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    store: new FileStore({}),
    secret: 'fwefweeeeeeeeeeeeeeeeeeee',
    resave: true,
    saveUninitialized: true,
}));
app.use('/api/v1', v1_1.default);
app.use('/', v2_1.default);
http_1.default.createServer(app).listen(configuration_1.portHTTP, () => {
    console.log("start HTTP express server");
});
//# sourceMappingURL=index.js.map