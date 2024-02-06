const express = require('express');
const router = express.Router();

const { InfluxDB } = require('@influxdata/influxdb-client');

// Création du client InfluxDB
const influxUrl = 'http://localhost:8086';
const influxToken = 'your-token';
const influxOrg = 'your-org';
const influxBucket = 'your-bucket';

const client = new InfluxDB({
  url: influxUrl,
  token: influxToken,
});

const queryApi = client.getQueryApi(influxOrg);


async function getArchiveData(from, to, filter, interval) {
  // Utilisez votre fluxQuery pour récupérer les données depuis la base de données
  const fluxQuery = `
    from(bucket: "${influxBucket}")
      |> range(start: ${from}, stop: ${to})
      |> filter(fn: (r) => r._measurement == "${filter}")
      |> yield()
  `;
  
  // Collectez les lignes de données depuis la base de données
  const { promise } = queryApi.collectRows(fluxQuery);
  const rows = await promise;

  // Formatez les données récupérées dans la structure attendue
  const formattedData = rows.map(row => ({
    name: row.name,
    location: {
      date: row.location.date,
      coords: row.location.coords
    },
    status: row.status,
    measurements: {
      date: row.measurements.date,
      rain: row.measurements.rain,
      light: row.measurements.light,
      temperature: row.measurements.temperature,
      humidity: row.measurements.humidity,
      pressure: row.measurements.pressure,
      wind: {
        speed: row.measurements.wind.speed,
        direction: row.measurements.wind.direction
      }
    }
  }));

  // Retournez les données formatées
  return formattedData;
}


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
