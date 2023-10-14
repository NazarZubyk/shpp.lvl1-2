import express from "express"
import { addItems, deleteItem, editItems, getItems, toLogin, toLogout, toRegister } from "../actions";

const router = express.Router();


    router.route('/items').all()
        
            
        const action = req.query.action;
        console.log(action) 
    
    const action = req.query.action;
    console.log(action)
    

    switch(action){
        case 'login':
            {
                toLogin;
                break;
            }
        case 'logout':{
                toLogout;
                break
            }
        case 'register':{
                toRegister;
                break;
            }
        case 'getItems':{
                getItems;
                break;
            }    
        case 'deleteItem':{
                deleteItem;
                break;
            }   
        case 'addItem':{
                addItems;
                break;
            }   
        case 'editItem':{
                editItems;
                break;
            }
    }
    
 catch (error) {
    console.error(error) 
}



export default router;