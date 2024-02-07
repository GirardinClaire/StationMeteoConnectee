
const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const token = process.env.INFLUXDB_TOKEN
const url = 'http://127.0.0.1:8086'

const org = "ensg";
const bucket = "meteo";

const client = new InfluxDB({url, token});
const queryClient = client.getQueryApi(org);
const writeClient = client.getWriteApi(org, bucket, 'ns');

const table = "measures";

function saveValues(data) {
  const point = new Point(table);
  for (var key in data) {
    point.floatField(key, data[key]);
  }
  writeClient.writePoint(point);
  writeClient.flush();
}

function getValues(start, stop, fields) {
  const filter_fields = fields.map(key => `r["_field"] == "${key}"`).join(" or ");
  const query = `from(bucket: "${bucket}")
    |> range(start: ${start}, stop:${stop})
    |> filter(fn: (r) => r._measurement == "${table}")
    |> filter(fn: (r) => ${filter_fields})
  `;

  const data = {};

  return new Promise((resolve, reject) => {
    queryClient.queryRows(query, {
      next: (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row);
        if (!data[tableObject._time]) {
          data[tableObject._time] = {};
        }
        data[tableObject._time][tableObject._field] = tableObject._value;
      },
      error: (error) => {
        reject(error);
      },
      complete: () => {
        resolve(data);
      },
    });
  })
}

/*
saveValues({
  a:1,
  b:2,
  c:80.4
});

const result = getValues("-1000m", "0m", ["a", "b"]);
result.then(console.log)
//*/


module.exports = {
  set: saveValues,
  get: getValues,
};
