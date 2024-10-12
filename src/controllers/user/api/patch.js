import 'dotenv/config';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Queries from '../../../db/queries/index.js';
import FormError from '../../../helpers/errors/formError.js';
import AuthError from '../../../helpers/errors/authError.js';

const db = Queries.userQueries;

const usernameValidator = () => 
    body('username')
    .trim()
    .notEmpty()
    .withMessage('Username name must not be empty')
    .custom(async (val) => {
        const regex = /^[a-zA-Z0-9_]+$/;
        // https://regexr.com/86mur

        return regex.test(val);
    })
    .withMessage('Username must not contain special characters except underscore')
    .custom(async (val, {req}) => {
        const userExist = await db.get.getUserByUsername(val);

        if (Number(req.user.id) === userExist?.id) return Promise.resolve();

        if (userExist) return Promise.reject('username already in use');

        return Promise.resolve();
    })
    .escape();

const username = [
    usernameValidator(),
    asyncHandler(async (req, res, _) => {
        const errors = validationResult(req);
        const { userId } = req.params;
        const { username } = req.body;

        if (!errors.isEmpty()) {
            const errorFields = errors.array().map((err) => {
                const { type, msg: message, path: field } = err;

                    return {
                        type,
                        field,
                        message,
                    };
                });

             throw new FormError(
                'Validation failed. Invalid form inputs',
                errorFields
            );
        }

        const user = await db.patch.patchUsername(userId, username);

        res.status(200).json({user});
    })
];

export default {
    username,
};