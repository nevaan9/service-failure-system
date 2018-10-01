const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const User = require('./src/models/User');

// Get the authentication stuff
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisasecretkey';

// passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
//   console.log(jwt_payload);
//   User.findOne({_id: jwt_payload.id}, function(err, user) {
//     if (err) {
//       return done(err, false);
//     }
//     if (user) {
//       console.log(user);
//       return done(null, user);
//     } else {
//       return done(null, false);
//       // or you could create a new account
//     }
//   });
// }));

const app = express();
const router = express.Router();
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
// app.use(passport.initialize());

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/PexServiceFailure', function(){
  console.log('Connection Made');
}).catch(err => {
  console.log('App starting error: ', err.stack);
  process.exit();
});

// Include Controllers
fs.readdirSync('./src/controllers').forEach(file => {
  if (file.substr(-3) === '.js'){
    const route = require('./src/controllers/' + file);
    route.controller(app);
  }
});

app.use(history());
app.use(serveStatic(__dirname + "/dist"));


router.get('/', function(req, res){
  res.json({msg: 'API Initialized!'});
});

// Port
const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function(){
  console.log(`api running on port ${port}`);
});
