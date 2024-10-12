import 'dotenv/config'

const logout = (req, res, next) => {
    
    req.session.destroy((err) => err ? next(err) : res.sendStatus(200))
};

export default {
    logout,
};