const express = require('express');
const passport = require('passport');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');
const router = express.Router();


router.get('/google', ensureGuest, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    req.flash('success', 'Welcome!!');
    res.redirect('/dashboard');
  });
  
router.get('/logout', ensureAuthenticated, (req, res) => {
  req.logout();
  req.flash('success', 'You are successfully logged out');
  res.redirect('/');
});


module.exports = router;