const fs = require('fs');
const db = require('./database.js');

const pathLiveDataJson = "Data/live.json";
const pathLiveDataJsonPTDR = "Data/livePtdr.json";

const liveData = {
  name: "piensg028",
  status: true,
  location: {
    date: null,
    coords: [null, null]
  },
  measurements: {
    date: null,
    temperature: null,
    humidity: null,
    pressure: null,
    rain: null,
    light: null,
    wind: {
      speed: null,
      direction: null,
    }
  }
};

const size_godet_rain = 0.3274; // mm.m-2

const incrData = {
  rainTurn: 0,
  rainComputedDate: new Date(),
};

function writeJsonFile(path, data) {
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function updateLive() {
  writeJsonFile(pathLiveDataJson, liveData);
  const liveDataPtdr = {
    name: liveData.name,
    status: liveData.status,
    location: liveData.location,
    measurements: {
      date: liveData.measurements.date,
      temperature: liveData.measurements.temperature,
      pressure: liveData.measurements.pressure,
      rain: liveData.measurements.rain,
    }
  };
  writeJsonFile(pathLiveDataJsonPTDR, liveDataPtdr);
}

function saveInDB() {
  const now = new Date();
  const dt = (now.getTime() - incrData.rainComputedDate.getTime()) / 3600000;

  const data = {
    loc_lat: liveData.location.coords[0],
    loc_lng: liveData.location.coords[1],
    tmpr: liveData.measurements.temperature,
    hmdt: liveData.measurements.humidity,
    prsr: liveData.measurements.pressure,
    rain: incrData.rainTurn * size_godet_rain / dt,
    lght: liveData.measurements.light,
    wind_speed: liveData.measurements.wind.speed,
    wind_dir: liveData.measurements.wind.direction
  };
  incrData.rainComputedDate = now;
  incrData.rainTurn = 0;
  console.log("save in db ", data);
  db.set(data);
}

updateLive();

setTimeout(() => {
  setInterval(saveInDB, 30000);
  saveInDB();
}, 30000 - (new Date()).getTime() % 30000);

function logError(data) {
  console.error(data);
  fs.appendFile(
    'Data/logsError',
    `${(new Date()).toUTCString()} : ${data}\n`,
    () => { });
}

logError("start server");

module.exports = {
  liveData: liveData,
  updateLive: updateLive,
  incrData: incrData,
  logError: logError
};
