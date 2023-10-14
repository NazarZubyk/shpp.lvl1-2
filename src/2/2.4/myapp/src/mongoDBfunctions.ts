import { Task } from "./types";

const User = require('./user')

export async function addNewUserToBD(login: String, password: String, tasks:[Task]) { 

    const doubledLogin:[] = await User.find({login:login}).exec();
    
    if(doubledLogin.length != 0){
        console.log("login already registered")     
    }else{
        const user = await User.create({login, password, tasks})
        console.log(`adds new user - ${user}`)    
    }     

}