const express = require('express');
const router = express.Router();

const db = require('../database.js');

async function getArchiveData() {
  // Retourne un objet JSON vide avec la structure spécifique
  return {
    "name" : "name",
    "location" : {
      "date" : [ "2000-01-23T04:56:07.000+00:00", "2000-01-23T04:56:07.000+00:00" ],
      "coords" : [ [ 0.8008281904610115, 0.8008281904610115 ], [ 0.8008281904610115, 0.8008281904610115 ] ]
    },
    "status" : true,
    "measurements" : {
      "date" : [ "2000-01-23T04:56:07.000+00:00", "2000-01-23T04:56:07.000+00:00" ],
      "rain" : [ 0.5, 0.3 ],
      "light" : [ 2.3021358869347655, 2.3021358869347655 ],
      "temperature" : [ 1.4658129805029452, 1.4658129805029452 ],
      "humidity" : [ 7.061401241503109, 7.061401241503109 ],
      "pressure" : [ 6.027456183070403, 6.027456183070403 ],
      "wind" : {
        "speed" : [ 5.962133916683182, 5.962133916683182 ],
        "direction" : [ 5.637376656633329, 5.637376656633329 ]
      }
    }
  };
}



/* GET Archive data */
router.get('/', async function(req, res, next) {
  try {
    const archiveData = await getArchiveData();
    res.json(archiveData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
