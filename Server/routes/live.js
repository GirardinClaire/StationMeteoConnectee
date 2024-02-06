var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile('liveData.json', { root: '../Server' })
});

module.exports = router;

