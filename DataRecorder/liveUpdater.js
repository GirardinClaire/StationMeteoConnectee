const fs = require('fs');
const db = require('./database.js');

const pathLiveDataJson = "Data/live.json";
//const pathLiveDataJsonPTDR = "Data/livePtdr.json";

const liveData = {
  name: "piensg028",
  status:true,
  location: {
    date: null,
    coords: [null, null]
  },
  measurements: {
    date: null,
    temperature: null,
    humidity: null,
    presure: null,
    rain: null,
    light: null,
    wind: {
      speed: null,
      direction: null,
    }
  }
};

function writeJsonFile(path, data) {
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function getDataLivePTDR() {
  const livePTDR = {...liveData};
  return livePTDR;
}

function updateLive() {
  writeJsonFile(pathLiveDataJson, liveData);
  //writeJsonFile(pathLiveDataJsonPTDR, getDataLivePTDR());
}

updateLive();

module.exports = {
  liveData: liveData,
  updateLive: updateLive
};
