import asyncHandler from 'express-async-handler';
import Queries from '../../../db/queries/index.js';
import APIError from '../../../helpers/errors/apiError.js';

const db = Queries.commentQueries;

const comments = async (req, res) => {
    const limit = req.query.limit || 10
    const offset = req.query.offset || 0

    const list = await db.get.getCommentList(limit, offset);

    res.status(200).json({ limit, offset, comments: list });
};

export default {
    comments,
};
