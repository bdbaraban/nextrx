import express from 'express';
import passport from 'passport';

const authRoutes = express.Router();

// Log in athlete
authRoutes.post('/login', (req, res, next): void => {
  passport.authenticate('local', (err, user, info): void => {
    if (err) {
      return next(err);
    } else if (!user) {
      res.send({ success: false, message: info.message });
    } else {
      req.login(user, (err): void => {
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

export default authRoutes;
