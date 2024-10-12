import 'dotenv/config';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import bcrypt from 'bcryptjs';
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
        .custom(async (val) => {
            const userExist = await db.get.getUserByUsername(val);

            if (userExist) return Promise.reject('username already in use');

            return Promise.resolve();
        })
        .escape();

const emailValidator = (isSignup) => {
    if (isSignup) {
        return body('email')
                .trim()
                .notEmpty()
                .withMessage('Email name must not be empty')
                .isEmail()
                .withMessage('The email is not a valid email address')
                .custom(async (val) => {
                    const userExist = await db.get.getUserByEmail(val);

                    if (userExist) return Promise.reject('Email already in use');

                    return Promise.resolve()
                })
                .escape();
    }

    return body('email')
    .notEmpty()
    .withMessage('Email name must not be empty')
}

const pwdValidator = () => 
        body('pwd')
        .trim()
        .notEmpty()
        .withMessage('Password must not be empty');

const pwdConfirmationValidator = () => 
        body('pwd_confirm')
        .trim()
        .notEmpty()
        .withMessage('Confirmation password must not be empty')
        .custom((val, { req }) => val === req.body.pwd)
        .withMessage('Password does not match');


const signUpValidators = [
    usernameValidator(),
    emailValidator(true),
    pwdValidator(),
    pwdConfirmationValidator()
];

const logInValidators = [
    emailValidator(false),
    pwdValidator(),
];

const signUp = [
    signUpValidators,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const {
            username, email, pwd
        } = req.body;
        
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

        const hashedPwd = await bcrypt.hash(pwd, 10);

        const user = await db.post.createUser(username, email, hashedPwd);

        delete user.password;

        req.login(user, (err) => {
            if (err) return next(err);

            // res.redirect(process.env.CLIENT_URL);
            res.status(201).json({ user, message: 'Successful sign up'});
        });
    })
];

const logIn = [
    // remove username and pwd-confirm validator 
    logInValidators,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

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

        next();
    }),
    (req, res, next) => (
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(new AuthError(err));
            if (!user || info) return next(new AuthError('Authentication failed', info.message));

            delete user.password;

            req.login(user, next);
        })(req, res, next)
    ),
    (req, res, _) => {
        res.status(200).json({
            message: 'Successful log in',
            // user: req.user,
        })
        
        // res.redirect(process.env.CLIENT_URL);
    }
];

export default {
    signUp,
    logIn,
};
