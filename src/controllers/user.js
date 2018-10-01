const User = require('../models/User');

// Get the auth stuff
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const ExtractJWT = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisasecretkey';

module.exports.controller = (app) => {
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
  app.post('/users/login', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;

      // Check if user is in the DB
      User.getUserByEmail(email, (err, user) => {
        if (!user) {
          res.status(404).json({ message: 'The user does not exist.', code: 1 });
        } else {
          // Check if users PW is correct
          User.comparePassword(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              const payload = { id: user.id, };
              const token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({ message: 'ok', token });
            } else {
              res.status(401).json({ message: 'Password is incorrect', code: 2 });
            }
          });
        }
      })
    }
  });
};
