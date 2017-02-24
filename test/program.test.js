var expect = require('chai').expect;

var transformCheckpoint = require('../src/program').transformCheckpoint;
var calculateDistanceWithRssi = require('../src/program').calculateDistanceWithRssi;
var conditionMesure = require('../src/program').conditionMesure

var Point = {
  id: 'whataw0nd3rful1d',
  uuid: 'whataw0nd3rful1d',
  address: 'unknown',
  addressType: 'unknown',
  connectable: true,
  advertisement: {
    localName: undefined,
    txPowerLevel: undefined,
    manufacturerData: undefined,
    serviceData: [],
    serviceUuids: [ 'abcd' ]
  },
  rssi: -66,
  services: null,
  state: 'outofcontrol'
}

describe('Function transformCheckpoint', function() {

  it('Function transformCheckpoint without parameter should return false', function() {
    expect(transformCheckpoint()).to.be.false;
  });

  it('Function transformCheckpoint with parameter should verify if parameter is mutated', function() {
    expect(transformCheckpoint(Point)).to.not.equal(Point);
  });
});

describe('Function calculateDistanceWithRssi', function() {

  it('Function calculateDistanceWithRssi with parameter egal 0 return -1.0', function() {
    expect(calculateDistanceWithRssi(0)).to.be.eql(-1.0);
  });

  it('Function calculateDistanceWithRssi without parameter return -1.0', function() {
    expect(calculateDistanceWithRssi()).to.be.eql(-1.0);
  });
});

describe('Function conditionMesure', function() {

  it('Function conditionMesure with parameter egal 0 return 0', function() {
    expect(conditionMesure(0)).to.be.eql("0cm");
  });

  it('Function conditionMesure with parameter greater or equal than 1 return parameter', function() {
    expect(conditionMesure(10)).to.be.eql("10m");
  });

  it('Function conditionMesure with parameter not greater or equal than 1 return parameter *100', function() {
    expect(conditionMesure(0.25)).to.be.eql("25cm");
  });
});
