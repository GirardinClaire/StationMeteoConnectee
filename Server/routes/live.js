const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile('liveData.json', { root: '../Server' })
});

module.exports = router;
