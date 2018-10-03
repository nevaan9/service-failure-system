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
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, email, password, done) => {
    User.getUserByEmail(email, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        req.authError = {message: 'Invalid Email', code: 401};
        return done(null, false);
      }
      User.comparePassword(password, user.password, (error, isMatch) => {
        if (isMatch) {
          req.success = {user};
          return done(null, user);
        } else {
          req.authError = {message: 'Invalid Password', code: 400};
          return done(null, false);
        }
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
  app.post('/users/login', passport.authenticate('local', { failWithError: true }), (req, res) => {
    res.status(200).send({message: 'Login Success!'});
  }, (error, request, response, next) => {
    if (request.authError){
      (request.authError.code === 401) ? response.status(request.authError.code).send({message: 'Invalid User', code: 1}) : response.status(request.authError.code).send({message: 'Invalid Passwprd', code: 2});
    } else if (request.success) {
      response.status(200).send(request.success);
    }
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
