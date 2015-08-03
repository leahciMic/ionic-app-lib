var archiver = require('archiver'),
    events = require('../lib/events'),
    fs = require('fs'),
    helpers = require('./helpers'),
    IoConfig = require('../lib/io-config'),
    path = require('path'),
    Project = require('../lib/project'),
    ioConfigJson = require('./.io-config.json'),
    Q = require('q');
    // rewire = require('rewire'),
    // settings = require('../lib/settings');

var testDir = '/ionic/app',
    configPath = __dirname;

describe('IoConfig', function() {

  beforeEach(function() {
  });

  it('should have IoConfig defined', function() {
    expect(IoConfig).toBeDefined();
  });

  it('should throw an exception when no app directory is passed', function() {
    expect(IoConfig.warnMissingData).toThrow('You must specify the app directory of the config you wish to list.');
  });

  it('should allow calls with app directories', function(done) {
    var promise = Q.defer();
    spyOn(Q, 'defer').andReturn(promise);
    spyOn(fs, 'readFile').andCallFake(function(path, callBack) {
      promise.resolve(true);
    });

    Q()
    .then(function(){
      return IoConfig.warnMissingData(testDir);
    })
    .then(function(result) {
      expect(result).toBe(true);
    })
    .catch(function(ex){
      expect('this').toBe(ex.stack);
    })
    .fin(done);
  });

  it('should read in the config file from an app directory', function() {
    var json = IoConfig.readConfigFile(configPath);

    expect(json).toBeDefined();
    expect(json.app_id).toBe('some_app_id');
    expect(json.api_key).toBe('some_api_key');

  });
});
