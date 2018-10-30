const ServiceFailureSchema = require('../models/ServiceFailure');

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
      req.app.io.emit('NOTIFICATION', {members: req.body.sentTo, message: req.body.description, sentBy: req.body.email })

    });

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
