var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(418).send('GetCoffee : Nope, pas dispo ...');
});

module.exports = router;
