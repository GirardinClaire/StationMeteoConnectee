var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;



// const express = require('express');
// const router = express.Router();

// const { InfluxDB } = require('@influxdata/influxdb-client');

// // Création du client InfluxDB
// const influxUrl = 'http://localhost:8086';
// const influxToken = 'your-token';
// const influxOrg = 'ensg';
// const influxBucket = 'meteo';

// const client = new InfluxDB({
//   url: influxUrl,
//   token: influxToken,
// });

// const queryApi = client.getQueryApi(influxOrg);

// async function getLiveData(ptdr) {
//   // Utilisation d'une fluxQuery pour récupérer les données depuis la base de données
//   const fluxQuery = `
//     from(bucket: "${influxBucket}")
//       |> range(start: ${from}, stop: ${to})
//       |> filter(fn: (r) => r._measurement == "${filter}")
//       |> yield()
//   `;
  
//   // Collection des lignes de données depuis la base de données
//   const { promise } = queryApi.collectRows(fluxQuery);
//   const rows = await promise;

//   // Formatage des données récupérées dans la structure attendue
//   const formattedData = rows.map(row => ({
//     name: row.name,
//     location: {
//       date: row.location.date,
//       coords: row.location.coords
//     },
//     status: row.status,
//     measurements: {
//       date: row.measurements.date,
//       rain: row.measurements.rain,
//       light: row.measurements.light,
//       temperature: row.measurements.temperature,
//       humidity: row.measurements.humidity,
//       pressure: row.measurements.pressure,
//       wind: {
//         speed: row.measurements.wind.speed,
//         direction: row.measurements.wind.direction
//       }
//     }
//   }));

//   // Retour des données formatées
//   return formattedData;
// }



// /* GET Live data */
// router.get('/live', async function(req, res, next) {
//   const { ptdr } = req.query;
  
//   try {
//     const liveData = await getLiveData(ptdr);
//     res.json(liveData);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
