const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const router = express.Router();

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

router.get('/', function(req, res){
  res.json({msg: 'API Initialized!'});
});

// Port
const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function(){
  console.log(`api running on port ${port}`);
});
