import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import next from 'next';
import session from 'express-session';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import uid from 'uid-safe';
import { connectClient, closeClient } from '../db/utils';
import api from '../api';
import authRoutes from './authRoutes';

const app = next({
  dev: process.env.NODE_ENV !== 'production'
});
const handle = app.getRequestHandler();

connectClient(process.env.MONGODB, (err): void => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('*** MongoDB mongoing on nextrx_db. ***');

  app
    .prepare()
    .then((): void => {
      const server = express();

      // Add session management to Express
      const sessionConfig = {
        secret: uid.sync(18),
        cookie: {
          maxAge: 86400 * 1000 // 24 hours in milliseconds
        },
        resave: false,
        saveUninitialized: true
      };
      server.use(session(sessionConfig));

      // Configure Auth0 strategy
      const auth0Strategy = new Auth0Strategy.Strategy(
        {
          domain: process.env.AUTH0_DOMAIN,
          clientID: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
          callbackURL: process.env.AUTH0_CALLBACK_URL
        },
        function(_1, _2, _3, profile, done): void {
          return done(null, profile);
        }
      );

      // Configure Passport
      passport.use(auth0Strategy);
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
          return res.redirect('/login');
        }
        next();
      };

      server.use('/api/athletes/:email', restrictAccess);

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
