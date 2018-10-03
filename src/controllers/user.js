const User = require('../models/User');

// Get the auth stuff
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const ExtractJWT = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisasecretkey';

const LocalStrategy = require('passport-local').Strategy;

module.exports.controller = (app) => {
  // local strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    User.getUserByEmail(email, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      User.comparePassword(password, user.password, (error, isMatch) => {
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false);
      });
      return true;
    })
  }));

  // User Register
  app.post('/users/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
      name,
      email,
      password,
    });
    User.createUser(newUser, (error, user) => {
      if (error) {console.log(error);}
      res.send(user);
    })
  });

  // User login
  app.post('/users/login', passport.authenticate('local', {failureRedirect: '/users/login'}), (req, res) => {
    res.send({message: 'ok'});
  });

  passport.serializeUser((user, done) => {
    console.log('In the Serialize Function!');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('In the De-Serialize Function!');
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
