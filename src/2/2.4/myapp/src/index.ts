import express from 'express'
import http from 'http'
import cors from 'cors'
import session from 'express-session'
import { Request, Response } from 'express';
import { Task } from './types';
import { body, validationResult } from 'express-validator';
import {IUserDocument} from './user'

const mongoURL = 'mongodb://127.0.0.1:32768';
const app = express()
const portHTTP = 3005;

//mongo part------------------------------
import mongoose from "mongoose";
import { fail } from 'assert';
import test from 'node:test';
const User = require('./user')

mongoose.connect(mongoURL);

async function addNewUserToBD(login: String, password: String, tasks:[Task]) { 

    const doubledLogin:[] = await User.find({login:login}).exec();
    
    if(doubledLogin.length != 0){
        console.log("login already registered")     
    }else{
        const user = await User.create({login, password, tasks})
        console.log(`adds new user - ${user}`)    
    }     

}


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
 




app.get('/api/v1/items',async (req : Request, res: Response)=>{
    try {
        if(req.session.user === undefined){

        if (!req.session.tasks) {
            req.session.tasks = [] as unknown as [Task];
        }

        if (!req.session.uniqueCaunt) {
            req.session.uniqueCaunt = 1;
        }

        
        let resJson = {items:req.session.tasks}
        res.send( resJson ) 
    }
    else{        
        const user = await User.findOne({login: req.session.user}).exec();

        if(user){
            const resJson = {items: user.tasks}
            res.send(resJson)
        }
        else{
            res.status(404).json({"error": `cannot finde ${req.session.user} in datdbase`})
        }        
    }       
    } catch (error) {
        res.status(500).json({ "error": "fatal server error in get-'/api/v1/items'" } )
    }
    
})

app.post('/api/v1/items',
[body('text').notEmpty().isString()] ,
async (req: Request, res: Response)=>{
try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( { "error": "bad request" } ); 
    }
    
    if(req.session.user === undefined){
        const bodyReq:{text:string} = req.body;

        if (!req.session.tasks) {
            req.session.tasks = [] as unknown as [Task];
        }

        if (!req.session.uniqueCaunt) {
            req.session.uniqueCaunt = 1;
        }

        const newTask: Task = {
            id: req.session.uniqueCaunt,
            text : bodyReq.text,
            checked : false
        } 

        req.session.tasks.push(newTask);
        req.session.uniqueCaunt++;

        const resJson = JSON.stringify({id:newTask.id})
        res.send(resJson)

        console.log(`adds new task with id:${newTask.id}`)
    }
    else{
        const user = await User.findOne({login: req.session.user}).exec();

        if (!user.lastUniqueCount) {
            user.lastUniqueCount = 1;
        }

        const bodyReq:{text:string} = req.body;
        const newTask: Task = {
            id: user.lastUniqueCount,
            text : bodyReq.text,
            checked : false
        } 
        
        if(user){
            user.tasks.push(newTask)
            user.lastUniqueCount++
            await user.save();
            const resJson = JSON.stringify({id:newTask.id})
            res.send(resJson)
        }
        else{
            res.status(404).json({error: "cannot found user"})
        }

    }    
} catch (error) {
    res.status(500).json({ "error": "fatal server error in post'/api/v1/items'" } )
}
})

app.put('/api/v1/items',
[
    body('text').notEmpty().isString(),
    body('id').notEmpty().isNumeric(),
    body('checked').notEmpty().isBoolean()
] ,
    async (req: Request, res: Response)=>{
try {    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( { "error": "bad request" } ); 
    }

    const reqBody = req.body;

    if(req.session.user === undefined){
        const indexForUpdate = req.session.tasks?.findIndex(task=> task.id === reqBody.id) 

        if(indexForUpdate !== -1  && req.session.tasks !== undefined && indexForUpdate !== undefined){
            req.session.tasks[indexForUpdate] = reqBody;
            res.send({ "ok" : true })
        }
        else{
            res.status(404)
        }
        console.log('put')
    }
    else{
        const user:IUserDocument = await User.findOne({login: req.session.user}).exec();

        if(user){
            const indexForUpdate = user.tasks.findIndex(task=> task.id === reqBody.id);
            user.tasks[indexForUpdate] = reqBody;
            await user.save();
            res.send({ "ok" : true })
        }
        else{
            res.status(404)
        }
        
    }
    
} catch (error) {
    res.status(500).json({ "error": "fatal server error in put('/api/v1/items'" } )
}
})

app.delete('/api/v1/items', 
[
    body('id').notEmpty().isNumeric()
],
    async (req: Request, res: Response)=>{
try {    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( { "error": "bad request" } ); 
    }

    const reqBody = req.body;
    if(req.session.user === undefined){
        
        const indexForUpdate = req.session.tasks?.findIndex(task=> task.id === reqBody.id) 

        if(indexForUpdate !== -1  && req.session.tasks !== undefined && indexForUpdate !== undefined){
            req.session.tasks.splice(indexForUpdate,1);
            res.send({ "ok" : true })
        }
        else{
            res.status(404)
        }
        console.log('deleted')
    }
    else{
        const user:IUserDocument = await User.findOne({login: req.session.user}).exec();

        const indexForUpdate = user.tasks.findIndex(task=> task.id === reqBody.id) 
        console.log("index - " + indexForUpdate)
        if(indexForUpdate !== -1   && indexForUpdate !== undefined){
            console.log("list - " + user.tasks);
            user.tasks.splice(indexForUpdate,1);
            console.log("list after - " + user.tasks);
            await user.save();
            res.send({ "ok" : true })
        }
        else{
            res.status(404)
        }      
    }
} catch (error) {
    res.status(500).json({ "error": "fatal server error in delete('/api/v1/items'" } )
}
})

declare module 'express-session' {
    interface SessionData {
      user?: string;
      tasks?: [Task] ;
      uniqueCaunt: number;
    }
  }

app.post('/api/v1/login',
[
    body('login').notEmpty(),
    body('pass').notEmpty()
],
async (req: Request,res: Response)=>{
try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( { "error": "bad request" } ); 
    }    
    
    const login = req.body?.login;
    const password = req.body?.pass;

    const user:[IUserDocument] = await User.find({login:login})
    
    if(!user){
        return res.status(401).json({ message: 'Invalid login credentials' });
    }
    
    if(password === user[0].password){
        req.session.user = user[0].login;
        res.send({"ok":true})   
    }
    else{
        console.log("password was not true")

    }
} catch (error) {
    res.status(500).json({ "error": "fatal server error in post('/api/v1/login'" } )
}
    
})

app.post('/api/v1/register',[
    body('login').notEmpty(),
    body('pass').notEmpty()
],
(req: Request,res: Response)=>{
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( { "error": "bad request" } ); 
        } 
    
        const login = req.body?.login;
        const password = req.body?.pass;
    
        const tasks = [] as unknown as [Task]   
    
        addNewUserToBD(login,password,tasks)
    
        res.send({"ok":true})   
    
    } catch (error) {
        res.status(500).json({ "error": "fatal server error in post('/api/v1/register'" } )  
    }
})

app.post('/api/v1/logout',(req: Request,res: Response)=>{
    try {
        req.session.destroy((err)=>{
            console.log(err)
        })
        res.send({'ok':true})
    } catch (error) {
        res.status(500).json({ "error": "fatal server error in post('/api/v1/logout'" } )  
    }
})

