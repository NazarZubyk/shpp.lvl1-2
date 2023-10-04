import mongoose from "mongoose";
import { Task } from "./types";

const userSchema = new mongoose.Schema({
    login : String,
    password : String,
    tasks: []  as unknown as [Task]
})

module.exports = mongoose.model('User', userSchema)