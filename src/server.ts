// Imports
import passport from 'passport';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import flash from 'express-flash';
import session from 'express-session';
import dotenv from 'dotenv';

// Database
import './database';

// Routes
import { routes } from './routes';

dotenv.config();

const app = express();

import initializePassport from './helpers/passport-config'
import { userInfo } from 'os';
initializePassport(passport)


// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors({ origin: "http://localhost:3333", credentials: true }));
app.set("trust proxy", 1);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
        cookie: {
            sameSite: "lax",
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
            httpOnly: true,
        }
    })
);
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((request, response, next) => {
    response.locals.error = request.flash('error')
    response.locals.user = request.user || null
    next()
})



app.use(routes);

app.listen(process.env.SEQUELIZE_CONNECTION_PORT, () => console.log(`Express server has started on port ${process.env.SEQUELIZE_CONNECTION_PORT}. Open http://localhost:${process.env.SEQUELIZE_CONNECTION_PORT}/ to see results.`));