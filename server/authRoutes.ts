import express from 'express';
import passport from 'passport';

const authRoutes = express.Router();

authRoutes.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile'
  }),
  (_, res): void => res.redirect('/athlete')
);

authRoutes.get('/callback', (req, res, next): void => {
  passport.authenticate('auth0', (err, user): void => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, (err): void => {
      if (err) {
        return next(err);
      }
      res.redirect('/athlete');
    });
  })(req, res, next);
});

authRoutes.get('/logout', (req, res): void => {
  req.logout();

  const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL } = process.env;
  res.redirect(
    `https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`
  );
});

export default authRoutes;
