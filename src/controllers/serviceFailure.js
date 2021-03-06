const ServiceFailureSchema = require('../models/ServiceFailure');
const config = require('./../../config/Config');
// Require nodemailer

module.exports.controller = (app) => {
  // add a new service failure
  app.post('/submit-service-failure',(req, res) => {
    const newServiceFailure = new ServiceFailureSchema({
      name: req.body.name,
      email: req.body.email,
      description: req.body.description,
      failedProcess: req.body.failedProcess,
      sentTo: req.body.sentTo
    });
    // Save to the database
    newServiceFailure.save((err, serviceFailure) => {
      if (err) {
        console.log(err)
      }
      res.send(serviceFailure);

      // Send an io message
      const notifyMembers = req.body.sentTo;
      notifyMembers.forEach((user) => {
        if (req.app.logUsers.has(user._id)) {
          req.app.io.emit(`NOTIFICATION-${user._id}`, {message: req.body.description, sentBy: req.body.email })
        }
      })

      var transporter = req.app.nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: 'nevaan.perera@gmail.com',
          pass: config.PASSWORD
        }
      });
      var mailOptions = {
        from: '"Pex Service Failure" <nevaan.perera@gmail.com>',
        to: 'nevaan9@gmail.com',
        subject: `New Service Failure From ${serviceFailure.name}`,
        text: `Follow link to see full details: http://localhost:8081/service-failure/${serviceFailure._id}`
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          console.log(err);
          return 'Error while sending email' + err
        }
        else {
          console.log("Email sent");
        }
      })
    });

  });

  app.get('/all-service-failures', (req, res) => {

    ServiceFailureSchema.find({}, 'name email description failedProcess sentTo', (error, serviceFailiures) => {
      if (error) { console.log(error)}
      res.send({ serviceFailiures });
    });
  });

  app.get('/aServiceFailure/:SFid', (req, res) => {
    ServiceFailureSchema.findById(req.params.SFid, 'name email description failedProcess sentTo', (error, SF) => {
      if (error) {
        console.error(error);
        console.error('Error');
      } else {
        res.send(SF);
      }
    });
  });

  app.get('/assignedToServiceFailures/:userId', (req, res) => {
    ServiceFailureSchema.find({ sentTo: req.params.userId }, (error, assignedToSFs) => {
      if (error) {
        console.log("Error: cannot find assigned SFs")
      } else {
        res.send(assignedToSFs)
      }
    });
  })
};
