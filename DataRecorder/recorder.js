const fs = require('fs');
require('log-timestamp');

function watchFile(path, callback, callbackError = console.error) {
  fs.watchFile(path, {interval: 10}, (curr, prev) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        return callbackError(err);
      }
      callback(data.trim());
    });
  });
}

const dir_simul = true ? "/home/formation/Bureau/simulPi" : "";

const pathDataSensHat = dir_simul + "/dev/shm/tph.log";
function readFileTph(fileContent) {
  const parsed = JSON.parse(fileContent);
  parsed.date = new Date(parsed.date);
  console.log("updated: tph.log");
  console.log("data = ", parsed);
}
watchFile(pathDataSensHat, readFileTph);


const pathDataRain = dir_simul + "/dev/shm/rainCounter.log";
function readFileRain(fileContent) {
  const date = new Date(fileContent);
  console.log("updated: rainCounter.log");
  console.log("date = ", date);
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
    lat: parseFloat(trameSpl[2]),
    latDirection: trameSpl[3],
    lng: parseFloat(trameSpl[4]),
    lngDirection: trameSpl[5],
    precision: parseFloat(trameSpl[8]),
    altitude: parseFloat(trameSpl[9]),
  };
  const time = parseFloat(trameSpl[1]);
  data.date.setHours(parseInt(time / 10000)+1);
  data.date.setMinutes(parseInt(time % 10000 / 100));
  data.date.setSeconds(Math.round(time % 100));
  console.log("updated: gpsNmea");
  console.log("data = ", data);
}
watchFile(pathDataGPS, readFileGPS);

const pathDataSensors = dir_simul + "/dev/shm/sensors";
function readFileSensors(fileContent) {
  const parsed = JSON.parse(fileContent);
  parsed.date = new Date(parsed.date);
  parsed.measure.forEach(measure => {
    measure.value = parseFloat(measure.value);
  });
  console.log("updated: sensors");
  console.log("data = ", parsed);
}
watchFile(pathDataSensors, readFileSensors);
