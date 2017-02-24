let chalk = require('chalk');
let _ = require('lodash');
let checkpointsService = require('./staticCheckpoints');


let calculateDistanceWithRssi = rssi => {
  var txPower = -59; // hard coded power value. Usually ranges between -59 to -65
  if (rssi == 0) {
    return -1.0;
  }
  var ratio = rssi * 1.0 / txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio,10);
  } else {
    var distance = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
    return distance;
  }
};

let transformCheckpoint = (checkpoint) => {
  if (checkpoint) {
    // Définition d'un nouvelle object sans toucher au paramêtre
    var verifyPoint = {};
    Object.assign(verifyPoint, checkpoint);
    // Get back essential properties
    verifyPoint.serviceData = verifyPoint.advertisement.serviceData;
    verifyPoint.serviceUuids = verifyPoint.advertisement.serviceUuids;
    // Transform data about distance
    verifyPoint.distance = calculateDistanceWithRssi(verifyPoint.rssi);
    // Clean uninteresting properties
    delete verifyPoint.id;
    delete verifyPoint.address;
    delete verifyPoint.addressType;
    delete verifyPoint.advertisement;
    delete verifyPoint.rssi;
    delete verifyPoint.services;
    // Everything is ok
    return verifyPoint;
  } else {
    return false;
  }
};

let showCheckpoint = (checkpoint, index) => {
  console.log(chalk.green('CHECKPOINT'), chalk.yellow(index + 1));
  _.forOwn(checkpoint,((property, key) => {
    console.log(chalk.cyan(key.toUpperCase()), property);
  }));

  console.log('\n');
};

let run = () => {
  let checkpoints = checkpointsService.getCheckpoints();
  checkpoints.map((checkpoint, index) => {
    showCheckpoint(transformCheckpoint(checkpoint), index);
  });
};

module.exports = {
  transformCheckpoint: transformCheckpoint,
  showCheckpoint: showCheckpoint,
  run: run
};
