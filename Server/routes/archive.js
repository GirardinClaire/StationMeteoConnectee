const express = require('express');
const router = express.Router();

const db = require('../database.js');


// // Exemple de requête simple pour vérifier la connexion
// const query = 'from(bucket: "' + db.influxBucket + '") |> range(start: -1h)';
// db.queryApi.queryRows(query, {
//   next(row, tableMeta) {
//     console.log(row, tableMeta);
//   },
//   error(error) {
//     console.error(error);
//   },
//   complete() {
//     console.log('Query completed successfully');
//   },
// });




// async function getArchiveData(from, to, filter, interval) {
//   // Utilisation d'une fluxQuery pour récupérer les données depuis la base de données
//   const fluxQuery = `
//   SELECT *
//   FROM meteo
//   WHERE time >= ${from} - INTERVAL '${from}`;
  
//   // Collection des lignes de données depuis la base de données
//   const { promise } = queryApi.collectRows(fluxQuery);
//   const rows = await promise;

//   // Formatage des données récupérées dans la structure attendue
//   const formattedData = rows.map(row => ({
//     name: row.name,
//     location: {
//       date: row.date,
//       coords: row.coords
//     },
//     status: row.status,
//     measurements: {
//       date: row.date,
//       rain: row.rain,
//       light: row.light,
//       temperature: row.temperature,
//       humidity: row.humidity,
//       pressure: row.pressure,
//       wind: {
//         speed: row.windSpeed,
//         direction: row.windDirection
//       }
//     }
//   }));

//   // Retour des données formatées
//   return formattedData;
// }


/* GET Archive data */
router.get('/archive', async function(req, res, next) {
  const { from, to, filter, interval } = req.query;
  
  try {
    const archiveData = await getArchiveData(from, to, filter, interval);
    res.json(archiveData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
