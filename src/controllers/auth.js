module.exports.controller = (app) => {
  app.get('/api/current_user', isLoggedIn, function(req, res){
    if (req.user) {
      res.status(200).send({current_user: req.user});
    }
  });


  function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()){
      return next();
    } else {
      res.status(401).send({success: false, msg: 'Unauthorized'});
    }
  }

  app.get('/api/logout', function(req, res) {
    req.logout();
    res.send();
  });
};
