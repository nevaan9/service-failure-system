const ProcessSchema = require('../models/Processe');
const User = require('../models/User');

module.exports.controller = (app) => {
  app.post('/process/register', (req, res) => {
    const newProcess = new ProcessSchema({
      name: req.body.name,
      members: [],
    });

    newProcess.save((err, process) => {
      if (err) {
        console.log(err);
      } else {
        res.send(process);
      }
    });
  });

  app.post('/process/add-member', (req, res) => {
    User.getUserByEmail(req.body.email, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        req.authError = {message: 'Invalid Email', code: 401};
        return done(null, false);
      }

      ProcessSchema.update(
        { _id: req.body.process_id },
        { $push: { members: user } },
        {upsert: false},
        (err, process) => {
          if (err) {
            console.log(err)
          } else {
            res.send(process)
          }
        }
      );
    });
  });

  app.get('/all-processes', (req, res) => {
    ProcessSchema.find({}, 'name members', (err, processes) => {
      if (err) throw err;
      res.send({processes})
    });
  })
};
