import { Router } from 'express';

const route = Router();

const protectedRoute = (req, res, next) => {
    console.log(req.session)
    if (req.user) return next();
    res.sendStatus(401);
};


route.get('/', protectedRoute, (req, res) => {
    console.log(req.user, req.session);

    res.send(req.user,)
})

export default route