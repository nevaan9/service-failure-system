const ServiceFailureSchema = require('../models/ServiceFailure');

module.exports.controller = (app) => {
  // add a new service failure
  app.post('/submit-service-failure', (req, res) => {
    const newServiceFailure = new ServiceFailureSchema({
      name: req.body.name,
      email: req.body.email,
      description: req.body.description,
    });

    // Save to the database
    newServiceFailure.save((err, serviceFailure) => {
      if (err) {
        console.log(err)
      }
      res.send(serviceFailure);
    });
  })
};
