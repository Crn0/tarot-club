import { Router } from 'express';
import controller from '../../controllers/comment/api/index.js';

const route = Router();

const protectedRoute = (req, res, next) => {
    if (req.user) return next();
    res.sendStatus(401);
};

route.get('/', controller.get.comments);

route.use(protectedRoute);

route.post('/', controller.post.newComment);

route.delete('/:commentId', controller.destroy.deleteComment);



export default route;