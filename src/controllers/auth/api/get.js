
import 'dotenv/config';
import passport from 'passport';

const google = passport.authenticate('google');

const googleCb = [
    (req, res, next) => {
        return passport.authenticate('google', (err, user, _) => {
            if (err) return next(err);
            
            if (!user) return res.redirect('/api/v1/auth/google');

            req.login(user, next);
        })(req, res, next)
    },
    (req, res, _) => {
        res.redirect(process.env.CLIENT_URL);
    }
];

const authFailure = async (req, res) => res.status(500).json({message: 'something went wrong'})

export default {
    google,
    googleCb,
    authFailure
};