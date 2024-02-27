const express = require('express');
const router = express.Router();

const db = require('../database.js');

async function getArchiveData(params) {
  const result = await db.get(
    JSON.stringify(params.from).replaceAll('"', ''),
    JSON.stringify(params.to).replaceAll('"', ''),
    params.filterSQL
  );
  const dates = Object.keys(result);
  const jsonResult = {
    name: "piensg028",
    status: true,
    location: {
      date: dates,
      coords: dates.map(d => [result[d].loc_lat, result[d].loc_lng])
    },
    measurements: {
      date: dates
    }
  };
  if (params.filterSQL.includes("prsr")) {
    jsonResult.measurements.pressure = dates.map(d => result[d].prsr);
  }
  if (params.filterSQL.includes("tmpr")) {
    jsonResult.measurements.temperature = dates.map(d => result[d].tmpr);
  }
  if (params.filterSQL.includes("rain")) {
    jsonResult.measurements.rain = dates.map(d => result[d].rain);
  }
  if (params.filterSQL.includes("wind_speed")) {
    jsonResult.measurements.wind = dates.map(d => ({
      speed:result[d].wind_speed,
      direction: result[d].wind_dir
    }));
  }
  if (params.filterSQL.includes("hmdt")) {
    jsonResult.measurements.humidity = dates.map(d => result[d].hmdt);
  }
  if (params.filterSQL.includes("lght")) {
    jsonResult.measurements.light = dates.map(d => result[d].lght);
  }
  return jsonResult;
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
      const factors = { // in ms
        "s": 1000,
        "m": 1000*60,
        "h": 1000*60*60,
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
    // interval step: 30 sec (=30000ms), interval min: 30 sec
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
