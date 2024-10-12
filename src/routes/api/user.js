import { Router } from 'express';
import controller from '../../controllers/user/api/index.js';

const route = Router();

const protectedRoute = (req, res, next) => {
    if (req.user) {
        return next();
    }

    res.sendStatus(401)
};

route.get('/me',  controller.get.user);

route.use(protectedRoute);

route.patch('/:userId/username', controller.patch.username);

route.delete('/:userId', controller.destroy.deleteUser);


export default route;