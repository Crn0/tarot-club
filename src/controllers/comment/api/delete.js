import asyncHandler from 'express-async-handler';
import Queries from '../../../db/queries/index.js';
import APIError from '../../../helpers/errors/apiError.js';

const commentDb = Queries.commentQueries

const deleteComment = asyncHandler(async (req, res, _) => {
    const { commentId } = req.params;

    const comment = await commentDb.get.getComment(commentId);
    if (!comment) throw new APIError(
        'Comment does not exist',
        'NOT FOUND',
        'RESOURCE ERROR',
        404
    )

    if (req.user?.role === 'admin' || req.user.id === comment.author.id) {
        await commentDb.destroy.delComment(commentId);

        res.status(204).json({});
    } else {
        
        res.sendStatus(401);
    }


});

export default {
    deleteComment,
};