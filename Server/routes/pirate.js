const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.status(404).send("C'est sécure !!");
});

module.exports = router;
