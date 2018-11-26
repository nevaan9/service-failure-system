const ServiceFailureSchema = require('../models/ServiceFailure');
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

    });

    // Send an io message
    const notifyMembers = req.body.sentTo;
    notifyMembers.forEach((userId) => {
      if (req.app.logUsers.has(userId)) {
        req.app.io.emit(`NOTIFICATION-${userId}`, {message: req.body.description, sentBy: req.body.email })
      }
    })

    var transporter = req.app.nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: 'nevaan.perera@gmail.com',
        pass: '********'
      }
    });
    var mailOptions = {
      from: '"Pex Service Failure 👻" <nevaan.perera@gmail.com>',
      to: 'nevaan9@gmail.com',
      subject: "HELLLLLLO",
      text: 'This is a test'
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

  app.get('/all-service-failures', (req, res) => {

    ServiceFailureSchema.find({}, 'name email description', (error, serviceFailiures) => {
      if (error) { console.log(error)}
      res.send({ serviceFailiures });
    });
  });

  app.get('/aServiceFailure/:SFid', (req, res) => {
    ServiceFailureSchema.findById(req.params.SFid, 'name email description', (error, SF) => {
      if (error) {
        console.error(error);
        console.error('Error');
      } else {
        res.send(SF);
      }
    });
  });
};
