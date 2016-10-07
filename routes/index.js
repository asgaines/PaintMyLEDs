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

router.get('/status', function(req, res, next) {
  if (process.env.PARTICLE_DEVICE_STATUS) {
    res.json({'deviceStatus': process.env.PARTICLE_DEVICE_STATUS});
  } else {
    // There is no currently known status, so fetch it directly
    var devicesPr = particle.getDevice({
      deviceId: process.env.PARTICLE_DEVICE_ID,
      auth: process.env.PARTICLE_ACCESS_TOKEN
    });

    devicesPr.then(
      function(data) {
        var connected = data.body.connected;
        if (connected) {
          process.env.PARTICLE_DEVICE_STATUS = 'online';
          res.json({'deviceStatus': process.env.PARTICLE_DEVICE_STATUS});
        } else {
          process.env.PARTICLE_DEVICE_STATUS = 'offline';
          res.json({'deviceStatus': process.env.PARTICLE_DEVICE_STATUS});
        }
      },
      function(err) {
        console.log('API failed: ', err);
      }
    );
  }
});

router.put('/status', function(req, res, next) {
  // API endpoint for Particle Photon events triggered 
  // by device coming online / going offline
  if (req.body.data == 'online') {
    process.env.PARTICLE_DEVICE_STATUS == 'online';
  } else if (req.body.data == 'offline') {
    process.env.PARTICLE_DEVICE_STATUS == 'offline';
  }

  res.json({'success': true});
});

module.exports = router;
