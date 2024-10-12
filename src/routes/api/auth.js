import { Router } from 'express';
import controller from '../../controllers/auth/api/index.js';

const route = Router();

const protectedRoute = (req, res, next) => {
    if (req.user) {
        return next();
    }

    res.sendStatus(401)
};

route.get('/google',  controller.get.google);
route.get('/google/callback', controller.get.googleCb);
route.get('/failure', controller.get.authFailure);

route.post('/local', controller.post.signUp);
route.post('/local/sessions', controller.post.logIn);

route.delete('/sessions', protectedRoute, controller.destroy.logout);

export default route;