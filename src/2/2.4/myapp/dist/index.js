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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const v1_1 = __importDefault(require("./api/v1"));
const actions_1 = require("./actions");
const mongoURL = 'mongodb://127.0.0.1:32768';
const app = (0, express_1.default)();
const portHTTP = 3005;
//mongo part------------------------------
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(mongoURL);
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
app.use('/api/v1', v1_1.default);
// //------------------------------------------------------------------------------------------------
// app.get('/api/v1/items',async (req : Request, res: Response)=>{
//     getItems(req,res);    
// })
// //------------------------------------------------------------------------------------------------
// app.post('/api/v1/items',
// [body('text').notEmpty().isString()] ,
// async (req: Request, res: Response)=>{
//     const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json( { "error": "bad request" } ); 
//         }
//     addItems(req,res);
// })
// //------------------------------------------------------------------------------------------------
// app.put('/api/v1/items',
// [
//     body('text').notEmpty().isString(),
//     body('id').notEmpty().isNumeric(),
//     body('checked').notEmpty().isBoolean()
// ] ,
//     async (req: Request, res: Response)=>{
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json( { "error": "bad request" } ); 
//         }
//     editItems(req,res);
// })
// //------------------------------------------------------------------------------------------------
// app.delete('/api/v1/items', 
// [
//     body('id').notEmpty().isNumeric()
// ],
//     async (req: Request, res: Response)=>{
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json( { "error": "bad request" } ); 
//     }
//     deleteItem(req,res);
// })
// //------------------------------------------------------------------------------------------------
// //------------------------------------------------------------------------------------------------
// app.post('/api/v1/login',
// [
//     body('login').notEmpty(),
//     body('pass').notEmpty()
// ],
// async (req: Request,res: Response)=>{
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json( { "error": "bad request" } ); 
//     }  
//     toLogin(req,res); 
// })
// //------------------------------------------------------------------------------------------------
// app.post('/api/v1/register',[
//     body('login').notEmpty(),
//     body('pass').notEmpty()
// ],
// (req: Request,res: Response)=>{
//     const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json( { "error": "bad request" } ); 
//         } 
//     toRegister(req,res);
// })
// //------------------------------------------------------------------------------------------------
// app.post('/api/v1/logout',(req: Request,res: Response)=>{
//     toLogout(req,res);
// })
app.all('/api/v2/router', [
    (_a = (0, express_validator_1.body)('login')) === null || _a === void 0 ? void 0 : _a.notEmpty(),
    (_b = (0, express_validator_1.body)('pass')) === null || _b === void 0 ? void 0 : _b.notEmpty(),
    (_d = (_c = (0, express_validator_1.body)('id')) === null || _c === void 0 ? void 0 : _c.notEmpty()) === null || _d === void 0 ? void 0 : _d.isNumeric(),
    (_f = (_e = (0, express_validator_1.body)('text')) === null || _e === void 0 ? void 0 : _e.notEmpty()) === null || _f === void 0 ? void 0 : _f.isString(),
    (_h = (_g = (0, express_validator_1.body)('checked')) === null || _g === void 0 ? void 0 : _g.notEmpty()) === null || _h === void 0 ? void 0 : _h.isBoolean()
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ "error": "bad request" });
        }
        const action = req.query.action;
        console.log(action);
        if (!action) {
            res.status(400).json({ "error": "bad request" });
        }
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
            case 'register': {
                yield (0, actions_1.toRegister)(req, res);
                break;
            }
            case 'getItems': {
                yield (0, actions_1.getItems)(req, res);
                break;
            }
            case 'deleteItem': {
                yield (0, actions_1.deleteItem)(req, res);
                break;
            }
            case 'addItem': {
                yield (0, actions_1.addItems)(req, res);
                break;
            }
            case 'editItem':
                {
                    yield (0, actions_1.editItems)(req, res);
                    break;
                }
                defaul: res.status(400).json({ "error": "bad request" });
        }
    }
    catch (error) {
        res.status(500).json({ "error": "fatal server error in post('/api/v1/logout'" });
    }
}));
