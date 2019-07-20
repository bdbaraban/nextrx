import express from 'express';
import passport from 'passport';

const authRoutes = express.Router();

// Log in athlete
authRoutes.post('/login', passport.authenticate('local'), (_, res): void => {
  res.send({ redirectURI: '/athlete' });
});

// Log out athlete
authRoutes.get('/logout', (req, res): void => {
  req.session.destroy((): void => {
    res.redirect('/');
  });
});

export default authRoutes;
