import express, { Request, Response } from 'express';
import { addItems, deleteItem, editItems, getItems, toLogin, toLogout, toRegister } from "../actions";
import { Result, ValidationChain, ValidationError, body, check, validationResult } from 'express-validator';
import { MyError } from '../types';

const router2 = express.Router();

    router2
    router2.all('/api/v2/router',
    async (req : Request, res : Response)=>{
        try {
            
            const action = req.query.action;
            console.log(action)
        

        switch(action){
            case 'login':
                {                        
                    await toLogin(req,res);
                    break;
                }
            case 'logout':{
                    await toLogout(req,res);
                    break
                }
            case undefined:{
                await toLogout(req,res);
                    break
            }
            case 'register':{
                    //you can adds more validators like isEmail()
                    await check('login').notEmpty().run(req);
                    await check('pass').notEmpty().run(req);
                    
                    await toRegister(req,res);
                    break;
                }
            case 'getItems':{
                    await getItems(req,res);
                    break;
                }    
            case 'deleteItem':{
                    await check('id').notEmpty().isNumeric().run(req);
                    
                    await deleteItem(req,res);
                    break;
                }   
            case 'createItem':{
                    
                    await check('text').notEmpty().run(req);
                                        
                    await addItems(req,res);
                    break;
                }   
            case 'editItem':{
                    await check('text').notEmpty().run(req);
                    await check('id').notEmpty().run(req);
                    await check('checked').notEmpty().isBoolean().run(req);
                    
                    await editItems(req,res);
                    break;
                }
            defaul: res.status(400).json( { "error": "bad request" })
        }
        } catch (error) {
            console.error(error)
            res.status(500).json({ "error": "fatal server error" } ); 
        }
        
    
        })
    
export default router2;