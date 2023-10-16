"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importDefault(require("express"));
const v1_1 = __importDefault(require("./api/v1"));
const v2_1 = __importDefault(require("./api/v2"));
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
app.use('/', v2_1.default);
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
// app.all('/api/v2/router', [
//     body('login')?.notEmpty(),
//     body('pass')?.notEmpty(),
//     body('id')?.notEmpty()?.isNumeric(),
//     body('text')?.notEmpty()?.isString(),
//     body('checked')?.notEmpty()?.isBoolean()
// ],
//     async (req: Request, res: Response) => {
//     try {
//         const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json( { "error": "bad request" } ); 
//             } 
//         const action = req.query.action;
//         console.log(action)
//         if(!action){
//             res.status(400).json( { "error": "bad request" } ); 
//         }
//         switch(action){
//             case 'login':
//                 {
//                     await toLogin(req,res);
//                     break;
//                 }
//             case 'logout':{
//                     await toLogout(req,res);
//                     break
//                 }
//             case 'register':{
//                     await toRegister(req,res);
//                     break;
//                 }
//             case 'getItems':{
//                     await getItems(req,res);
//                     break;
//                 }    
//             case 'deleteItem':{
//                     await deleteItem(req,res);
//                     break;
//                 }   
//             case 'addItem':{
//                     await addItems(req,res)
//                     break;
//                 }   
//             case 'editItem':{
//                     await editItems(req,res);
//                     break;
//                 }
//             defaul: res.status(400).json( { "error": "bad request" })
//         }
//     } catch (error) {
//         res.status(500).json({ "error": "fatal server error in post('/api/v1/logout'" } )  
//     }
// })
