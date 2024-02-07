const fs = require('fs');
require('log-timestamp');
const lu = require("./liveUpdater.js");

const dir_simul = true ? "/home/formation/Bureau/simulPi" : "";

function watchFile(path, callback, callbackError = console.error, first_load=true) {
  if (first_load) {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        return callbackError(err);
      }
      callback(data.trim());
    });
  }
  fs.watchFile(path, {interval: 10}, (curr, prev) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        return callbackError(err);
      }
      callback(data.trim());
    });
  });
}

const pathDataSensHat = dir_simul + "/dev/shm/tph.log";
function readFileTph(fileContent) {
  const parsed = JSON.parse(fileContent);
  parsed.date = new Date(parsed.date);

  lu.liveData.measurements.date = parsed.date;
  lu.liveData.measurements.temperature = parsed.temp;
  lu.liveData.measurements.humidity = parsed.hygro;
  lu.liveData.measurements.presure = parsed.press;
  lu.updateLive();
}
watchFile(pathDataSensHat, readFileTph);


const pathDataRain = dir_simul + "/dev/shm/rainCounter.log";
function readFileRain(fileContent) {
  const date = new Date(fileContent);

  lu.liveData.measurements.rain = date;
  lu.updateLive();
}
watchFile(pathDataRain, readFileRain);

const pathDataGPS = dir_simul + "/dev/shm/gpsNmea";
function readFileGPS(fileContent) {
  // trame NMEA type $GPGGA
  // `${trameCode=GPGGA},{date},{lat},{latDirection},{lon},{lonDirection},{positionnementType},{nbSatelites},{horizontalPrecision},{altitude},{altitudeUnit},{*empty},{checksum}`
  //          0             1     2       3           4       5                   6                   7               8                   9         10            ?        N
  const trame = fileContent.split("\n").filter((trame) => trame.startsWith("$GPGGA"))[0];
  const trameSpl = trame.split(",");
  const data = {
    date: new Date(),
    lat: parseFloat(trameSpl[2]) * (trameSpl[3] == "N" ? 1 : -1),
    lng: parseFloat(trameSpl[4]) * (trameSpl[5] == "E" ? 1 : -1),
    latGeo: null,
    lngGeo: null,
    precision: parseFloat(trameSpl[8]),
    altitude: parseFloat(trameSpl[9]),
  };
  data.latGeo = Math.round((parseInt(data.lat/100) + (data.lat % 100)/60)*1e6) / 1e6;
  data.lngGeo = Math.round((parseInt(data.lng/100) + (data.lng % 100)/60)*1e6) / 1e6;

  const time = parseFloat(trameSpl[1]);
  data.date.setHours(parseInt(time / 10000)+1);
  data.date.setMinutes(parseInt(time % 10000 / 100));
  data.date.setSeconds(Math.round(time % 100));

  lu.liveData.location.date = data.date;
  lu.liveData.location.coords = [data.latGeo, data.lngGeo];
  lu.updateLive();
}
watchFile(pathDataGPS, readFileGPS);

const pathDataSensors = dir_simul + "/dev/shm/sensors";
function readFileSensors(fileContent) {
  const parsed = JSON.parse(fileContent);
  parsed.date = new Date(parsed.date);
  parsed.measurements = {};
  parsed.measure.forEach(measure => {
    measure.value = parseFloat(measure.value);
    parsed.measurements[measure.name] = measure.value;
  });

  lu.liveData.measurements.date = parsed.date;
  lu.liveData.measurements.light = parsed.luminosity;
  lu.liveData.measurements.wind = {
    speed: parsed.measurements.wind_speed_avg,
    direction: parsed.measurements.wind_heading,
  };
  lu.updateLive();
}
watchFile(pathDataSensors, readFileSensors);
