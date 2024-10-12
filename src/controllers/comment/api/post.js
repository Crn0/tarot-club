import 'dotenv/config';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Queries from '../../../db/queries/index.js';
import FormError from '../../../helpers/errors/formError.js';

const db = Queries.commentQueries;


const commentValidator = () => 
        body('comment_body')
        .notEmpty()
        .withMessage('Comment must not be empty');

const newComment = [
    commentValidator(),
    asyncHandler(async (req, res, _) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(42)

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

        const { id } = req.user;
        const { comment_body } = req.body;

        const comment = await db.post.createComment(id, comment_body);
        
        res.status(201).json({ comment });
    })
];

export default {
    newComment
};