const { InfluxDB } = require('@influxdata/influxdb-client');

// Création du client InfluxDB
const influxUrl = 'http://localhost:8086';
const influxToken = 'fKPqUp2avcPkez6hrU1p4TSHcKXKAQho5H51pcia_Vsvd3egChMSg2O_kAgwKBS5Kbj-GOH81P6HrxGtqVrrWg==';
const influxOrganisation = 'ensg';
const influxBucket = 'meteo';

const client = new InfluxDB({
  url: influxUrl,
  token: influxToken,
});

const queryApi = client.getQueryApi(influxOrganisation);

module.exports = {
  queryApi:queryApi,
  influxBucket:influxBucket,
  // client:client
};