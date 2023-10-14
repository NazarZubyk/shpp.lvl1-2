import express from "express"
import { addItems, deleteItem, editItems, getItems, toLogin, toLogout, toRegister } from "../actions";

const router = express.Router();

try {
    router.route('/items').all(
        const action = req.query.action;
        console.log(action) 
    )
    const action = req.query.action;
    console.log(action)
    if(!action){
        res.status(400).json( { "error": "bad request" } ); 
    }

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
        case 'register':{
                await toRegister(req,res);
                break;
            }
        case 'getItems':{
                await getItems(req,res);
                break;
            }    
        case 'deleteItem':{
                await deleteItem(req,res);
                break;
            }   
        case 'addItem':{
                await addItems(req,res)
                break;
            }   
        case 'editItem':{
                await editItems(req,res);
                break;
            }
        
    }
} catch (error) {
    console.error(error) 
}


export default router;