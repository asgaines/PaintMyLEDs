var express = require('express');
var router = express.Router();
var Particle = require('particle-api-js');
var mongoose = require('mongoose');
var Painting = mongoose.model('Painting');

var config = require('../config');

var particle = new Particle();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Paint My LEDs' });
});

router.post('/', function(req, res, next) {
  var fnPr = particle.callFunction(
    {
      deviceId: config.particle.deviceId,
      name: 'led-data',
      argument: req.body.data,
      auth: config.particle.accessToken
    }
  );

  fnPr.then(
    function(data) {
      if (data.body.connected && data.body.return_value) {
        // Take picture
      }
      res.json(data.body);
    },
    function(err) {
      res.json(err);
    }
  );

  var painting = new Painting(req.body);
  painting.save(function(err, painting) {
    if (err) {
      return next(err);
    }
  });
});

router.get('/paintings', function(req, res, next) {
  Painting.find(function(err, paintings) {
    if (err) {
      return next(err);
    }
    res.json(paintings);
  });
});

module.exports = router;
