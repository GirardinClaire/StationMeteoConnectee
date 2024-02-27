const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: '../Server/doc_api/' })
});

module.exports = router;
