var express = require('express');
var router = express.Router();
var Particle = require('particle-api-js');
var mongoose = require('mongoose');
var Painting = mongoose.model('Painting');

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
        var painting = new Painting(req.body);
        painting.save(function(err, painting) {
          if (err) {
            return next(err);
          }
        });
        console.log(data.body);
        res.json(data.body);
      }
    },
    function(err) {
      res.json(err);
    }
  );

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
