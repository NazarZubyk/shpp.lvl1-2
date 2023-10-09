import mongoose from "mongoose";
import { Document } from "mongoose";
import { Task } from "./types";

const userSchema = new mongoose.Schema({
    lastUniqueCount: Number,
    login : String,
    password : String,
    tasks: []  as unknown as [Task]
})

interface IUserDocument extends Document {
    lastUniqueCount: Number,
    login: string;
    password: string;
    tasks: [Task];
}

export { IUserDocument };

module.exports = mongoose.model('User', userSchema)