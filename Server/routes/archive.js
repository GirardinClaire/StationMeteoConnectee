const express = require('express');
const router = express.Router();

const db = require('../database.js');

async function getArchiveData(params) {
  const result = await db.get(
    JSON.stringify(params.from).replaceAll('"', ''),
    JSON.stringify(params.to).replaceAll('"', ''),
    params.filterSQL
  );
  console.log(result);
  const dates = [];
  const jsonResult = {
    name: "piensg028",
    status: true,
    location: {
      date: dates,
      coords: []
    },
    measurements: {
      date: dates
    }
  };
  //return jsonResult;
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

const filterMap = {
  prsr: ["prsr"],
  tprt: ["tmpr"],
  rain: ["rain"],
  wind: ["wind_speed", "wind_dir"],
  hmdt: ["hmdt"],
  lght: ["lght"],
  pressure: ["prsr"],
  temperature: ["tmpr"],
  humidity: ["hmdt"],
  light: ["lght"]
}
const filterKeys = Object.keys(filterMap);


router.get('/', async function(req, res, next) {
  const params = {};
  try {
    params.from = new Date(req.query.from);
    if (req.query.from == null || isNaN(params.from.getTime())) {
      throw "from";
    }
    params.to = req.query.to ? new Date(req.query.to): new Date();
    if (isNaN(params.to.getTime()) || params.to <= params.from) {
      throw "to";
    }
    params.filter = req.query.filter?.split(",");
    if (params.filter == null || params.filter == "all") {
      params.filter = filterKeys;
    }
    if (params.filter.filter(value => !filterKeys.includes(value)).length!=0) {
      throw "filter";
    }
    params.filterSQL = ["loc_lat", "loc_lng", ...new Set(params.filter.map(f => filterMap[f]).flat())];

    if (req.query.interval) {
      const intervalValue = parseFloat(req.query.interval);
      const intervalFactor = req.query.interval?.substr(-1);
      const factors = {
        s: 1000,
        m: 1000*60,
        h: 1000*60*60,
        "D": 1000*60*60*24,
        "M": 1000*60*60*24*30,
        "Y": 1000*60*60*24*365
      };
      params.interval = intervalValue * factors[intervalFactor];
      if (isNaN(params.interval)) {
        throw "interval";
      }
    } else {
      params.interval = (params.to.getTime() - params.from.getTime()) / 250;
    }
    // interval step: 30 sec, interval min: 30 sec
    params.interval = Math.max(1, Math.round(params.interval / 30000)) * 30000;
  } catch (error) {
    console.error(error);
    if (typeof error == "string") {
      res.status(400).json({ error: `Invalid parameters : parameter '${error}' is unvalid.`});
    } else {
      res.status(400).json({ error: 'Invalid parameters'});
    }
    return;
  }
  try {
    console.log("params : ", params);
    const archiveData = await getArchiveData(params);
    res.json(archiveData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
