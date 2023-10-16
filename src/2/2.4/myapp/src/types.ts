import { Document } from "mongoose";

export interface Task{
    id: number;
    text: string;
    checked: boolean;
}

export interface IUserDocument extends Document {
    lastUniqueCount: Number,
    login: string;
    password: string;
    tasks: [Task];
}

export interface MyError {
    type: string,
    value: string,
    msg: string,
    path: string,
    location: string
}