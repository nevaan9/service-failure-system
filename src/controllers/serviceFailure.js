const ServiceFailureSchema = require('../models/ServiceFailure');

module.exports.controller = (app) => {
  // add a new service failure
  app.post('/submit-service-failure',(req, res) => {
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
