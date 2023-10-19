import http from 'http'
import cors from 'cors'
import express from 'express';
import session from 'express-session';
import routerv1 from './api/v1';
import routerv2 from './api/v2';
import mongoose from "mongoose";
import { mongoURL, portHTTP } from './configuration';
import { Task } from './types';

//filestore for sessions
const FileStore = require('session-file-store')(session);
const app = express()

//mongo part------------------------------

mongoose.connect(mongoURL);

//----------------------------------------
declare module 'express-session' {
  interface SessionData {
    user?: string;
    tasks?: [Task] ;
    uniqueCaunt: number;
    
  }
}


//http server------------------------------------------------------

//need for correct procession of json
app.use(express.json());
//cors for use a frontend separately of back
app.use(cors())
//router adds configuration
app.use('/api/v1', routerv1);
app.use('/',routerv2)
//start sataic frontend
app.use(express.static('frontend'));

//adds sessions to app
app.use(session({
  store: new FileStore({}),
  secret: 'fwefweeeeeeeeeeeeeeeeeeee',
  resave: true,
  saveUninitialized: true,    
}));


//start server
http.createServer(app).listen(portHTTP,()=>{
  console.log("start HTTP express server")
})
 





