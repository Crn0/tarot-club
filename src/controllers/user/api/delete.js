import asyncHandler from 'express-async-handler';
import Queries from '../../../db/queries/index.js';
import APIError from '../../../helpers/errors/apiError.js';

const db = Queries.userQueries;

const deleteUser = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    const userExist = await db.get.getUser(userId);

    if (userExist) {
        if (req.user?.roles === 'admin' || req.user.id === Number(userId)) {
            await db.destroy.delUser(userId);
            
            req.session.destroy((err) => err ? next(err) : res.sendStatus(204))
        } else {
            res.sendStatus(401);
        }
    } else {
        throw new APIError(
            'User does not exist',
            'NOT FOUND',
            'RESOURCE ERROR',
            404
        )
    }
});

export default {
    deleteUser
};