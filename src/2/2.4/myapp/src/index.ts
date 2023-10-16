import http from 'http'
import cors from 'cors'
import session from 'express-session'
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import routerv1 from './api/v1';
import routerv2 from './api/v2';


import { deleteItem, getItems, addItems, editItems, toLogin, toLogout, toRegister } from './actions';


const mongoURL = 'mongodb://127.0.0.1:32768';
const app = express()
const portHTTP = 3005;

//mongo part------------------------------
import mongoose from "mongoose";

mongoose.connect(mongoURL);

//----------------------------------------


//http server------------------------------------------------------

//need for correct procession of json
app.use(express.json());
//cors for use a frontend separately of back
app.use(cors())
//use for start frontend with the back together 
app.use(express.static('frontend'))

    const FileStore = require('session-file-store')(session);
    app.use(session({
        store: new FileStore({}),
        secret: 'someLongSecretKayrjdncijewnfdi3jnd3n5j35n4k32jn4n',
        resave: true,
        saveUninitialized: true,      
    }));

http.createServer(app).listen(portHTTP,()=>{
  console.log("start HTTP express server")
})
 

app.use('/api/v1', routerv1);
app.use('/',routerv2)

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

