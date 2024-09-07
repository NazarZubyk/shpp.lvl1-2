import express from "express"
import { addItems, deleteItem, editItems, getItems, toLogin, toLogout, toRegister } from "../actions";
import { body } from 'express-validator';

const router = express.Router();

try {
    router.route('/items')
        .get(getItems)
        .post([
            body('text').notEmpty().isString()
        ],addItems)
        .put([
            body('text').notEmpty().isString(),
            body('id').notEmpty().isNumeric(),
            body('checked').notEmpty().isBoolean()
        ] ,editItems)
        .delete([
            body('id').notEmpty().isNumeric()
        ],deleteItem);

    router.route('/login')
        .post([
            body('login').notEmpty(),
            body('pass').notEmpty()
        ],toLogin);

    router.route('/register')
        .post([
            body('login').notEmpty(),//.isEmail(),
            body('pass').notEmpty()
        ],toRegister);

    router.route('/logout')
        .post(toLogout)
} catch (error) {
    console.error(error)
}

export default router;