const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile(req.query.ptdr == null ? 'live.json' : 'livePtdr.json', { root: '../DataRecorder/Data' })
});

module.exports = router;
