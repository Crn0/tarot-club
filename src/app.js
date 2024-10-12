import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import __dirname from '../dirname.mjs';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import corsOptions from './configs/cors/index.js';
import sessionConfig from './configs/session/index.js'
import passportConfig from './configs/passport/index.js';
import apiRoute from './routes/api/index.js';
import errorHandler from './helpers/errors/errorHandler.js';

const app = express();


passport.use(passportConfig.localStrategy);
passport.use(passportConfig.googleStrategy);
passport.serializeUser(passportConfig.serializeUser);
passport.deserializeUser(passportConfig.deserializeUser);

// view engine setup
app.set('views', join(__dirname, 'src/views'));
app.set('view engine', 'pug');
app.use(cors(corsOptions));
app.use(sessionConfig.psqlSession);
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression()); // Compress all routes
app.use(express.static(join(__dirname, 'public')));

app.use('/', apiRoute.logRoute);
app.use('/api/v1/auth', apiRoute.authRoute);
app.use('/api/v1/users', apiRoute.userRoute);
app.use('/api/v1/comments', apiRoute.commentRoute);

// error handler
app.use((err, req, res, _) => {
    errorHandler.handleError(err, res);
});

export default app;
