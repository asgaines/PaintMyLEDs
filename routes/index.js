var express = require('express');
var router = express.Router();
var Particle = require('particle-api-js');

var particle = new Particle();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PaintMyLEDs' });
});

router.post('/', function(req, res, next) {
  var publishEvent = particle.publishEvent(
    { 
      name: 'led-data',
      data: req.body.data,
      auth: 'f28e2e04497809ef8edaadbc8b4dcf25c6a69aeb'
    }
  );

  publishEvent.then(
    function(data) {
      if (data.body.ok) {
        res.json(data.body);
      }
    },
    function(err) {
      res.json(err);
    }
  );
});

module.exports = router;
