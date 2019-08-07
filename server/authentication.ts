import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { login, changePassword, create, update, verify } from './utils';

const authRoutes = express.Router();

// Configure Passport with local strategy
passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    login
  )
);
passport.serializeUser((athlete, done): void => done(null, athlete));
passport.deserializeUser((athlete, done): void => done(null, athlete));

// Log in athlete
authRoutes.post('/login', (req, res, next): void => {
  passport.authenticate('local', (err, athlete, info): void => {
    if (err) {
      return next(err);
    } else if (!athlete) {
      res.send({ success: false, message: info.message });
    } else {
      req.login(athlete, (err): void => {
        if (err) {
          return next(err);
        }
        res.send({ success: true, redirectURI: '/athlete' });
      });
    }
  })(req, res, next);
});

// Log out athlete
authRoutes.get('/logout', (req, res): void => {
  req.session.destroy((): void => {
    res.redirect('/');
  });
});

// Sign up an athlete
authRoutes.post('/signup', (req, res, next): void => {
  const { email, password } = req.body;

  create(email, password, (err, athlete, info): void => {
    if (err) {
      return next(err);
    } else if (!athlete) {
      res.send({ success: false, message: info.message });
    } else {
      req.login(athlete, (err): void => {
        if (err) {
          return next(err);
        }
        res.send({ success: true, redirectURI: '/settings' });
      });
    }
  });
});

// Update an athlete's profile.
authRoutes.post('/update', (req, res, next): void => {
  const { _id, ...attributes } = req.body;

  update(_id, attributes, (err, success, info): void => {
    if (err) {
      return next(err);
    } else if (!success) {
      res.send({ success, message: info.message });
    } else {
      req.session.passport.user = Object.assign(
        {},
        req.session.passport.user,
        req.body
      );
      req.session.save((err): void => {
        if (err) {
          console.log(err);
        }
      });
      res.send({ success });
    }
  });
});

// Verify an athlete's email.
authRoutes.post('/verify', (req, res, next): void => {
  const email = req.body;

  verify(email, (err, success, info): void => {
    if (err) {
      return next(err);
    } else if (!success) {
      res.send({ success, message: info.message });
    } else {
      req.session.passport.user = Object.assign(
        {},
        req.session.passport.user,
        req.body
      );
      req.session.save((err): void => {
        if (err) {
          console.log(err);
        }
      });
      res.send({ success });
    }
  });
});

// Change an athlete's password.
authRoutes.post('/changepassword', (req, res, next): void => {
  const { _id, newPassword } = req.body;

  changePassword(_id, newPassword, (err, success, info): void => {
    if (err) {
      return next(err);
    } else if (!success) {
      res.send({ success, message: info.message });
    } else {
      req.session.passport.user = Object.assign(
        {},
        req.session.passport.user,
        req.body
      );
      req.session.save((err): void => {
        if (err) {
          console.log(err);
        }
      });
      res.send({ success });
    }
  });
});

export { authRoutes, passport };
