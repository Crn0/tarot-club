import 'dotenv/config';
import asyncHandler from 'express-async-handler';
import Queries from '../../../db/queries/index.js';
import APIError from '../../../helpers/errors/apiError.js';

const db = Queries.userQueries;

const user = asyncHandler(async (req, res, _) => {

    res.status(200).json({ user: req.user ? {id: req.user.id, username: req.user.username, email: req.user.email } : null });
});


export default {
    user
};