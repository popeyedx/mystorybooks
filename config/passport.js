const mongoose = require('mongoose');
const User = mongoose.model('users');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');

module.exports = function(passport) {
  
  passport.use(new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {

      
      const image = profile.photos[0].value;
      
      const newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      };
      
      User.findOne({googleID: newUser.googleID})
        .then(user => {
          if(user) {
            done(null, user);
          } else {
            newUser.save()
              .then(user => done(null, user))
              .catch(err => done(err, null));
          }
        });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => console.log(err.message));
  });
};
