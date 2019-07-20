import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import BodyParser from 'body-parser';
import next from 'next';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import uid from 'uid-safe';
import { connectClient, closeClient } from '../db/utils';
import api from '../api';
import authRoutes from './authRoutes';
import { login } from './utils';

// Configure Next application
const app = next({
  dev: process.env.NODE_ENV !== 'production'
});
// Configure request handler
const handle = app.getRequestHandler();

// Connect to MongoDB database
connectClient((err): void => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('*** MongoDB mongoing on nextrx_db. ***');

  // Instantiate Express server
  app
    .prepare()
    .then((): void => {
      const server = express();

      server.use(BodyParser.json());

      // Add session management to Express
      server.use(
        session({
          secret: uid.sync(18),
          cookie: {
            maxAge: 86400 * 1000 // 24 hours in milliseconds
          },
          resave: false,
          saveUninitialized: true
        })
      );

      // Configure Passport with Auth0 strategy
      passport.use(
        new LocalStrategy.Strategy(
          {
            usernameField: 'email',
            passwordField: 'password'
          },
          login
        )
      );
      passport.serializeUser((user, done): void => done(null, user));
      passport.deserializeUser((user, done): void => done(null, user));

      // Add Passport
      server.use(passport.initialize());
      server.use(passport.session());

      // Add authentication routes
      server.use(authRoutes);

      // Add NextRX API
      server.use(api);

      const restrictAccess = (
        req: Request,
        res: Response,
        next: NextFunction
      ): void => {
        if (!req.isAuthenticated()) {
          return res.redirect('/');
        }
        next();
      };

      // Restrict access on athlete profile page
      server.use('/athlete', restrictAccess);

      // Let Next handle all other requests
      server.get(
        '*',
        (req, res): Promise<void> => {
          return handle(req, res);
        }
      );

      createServer(server).listen(process.env.PORT, (): void => {
        console.log(
          `*** Server serving on http://localhost:${process.env.PORT} ***`
        );
      });
    })
    .catch((ex): void => {
      console.error(ex.stack);
      closeClient();
      process.exit(1);
    });
});
