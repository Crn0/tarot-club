import localStrategy from './localStrategy.js';
import googleStrategy from './googleStrategy.js';
import {serializeUser, deserializeUser} from './serialize.js';

export default {
    localStrategy,
    googleStrategy,
    serializeUser,
    deserializeUser
};