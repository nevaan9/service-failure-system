const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const session = require('express-session');
const config = require('./config/Config');

// Get the authentication stuff
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisasecretkey';

const app = express();
const router = express.Router();
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: config.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: false }
}));

app.use(passport.initialize());
app.use(passport.session());

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

// Port
const port = process.env.API_PORT || 8081;


app.use(history());
app.use(serveStatic(__dirname + "/dist"));

const server = app.listen(port, function(){
  console.log(`api running on port ${port}`);
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
  console.log(`Connected to socket with socketID: ${socket.id}`);
  socket.on('SEND_MESSAGE', function(data) {
    io.emit('NOTIFICATION', data)
  });
});

// Make the io object global
app.io = io;
