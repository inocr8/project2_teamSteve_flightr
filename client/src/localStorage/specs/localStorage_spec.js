var LocalStorageManager = require('../localStorageManager.js');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Local Storage', function(){

  it('should start with as undefined for packages', function(){
    assert.equal(undefined, LocalStorageManager.packages);
  });

  it('should start with as undefined for itineraries', function(){
    assert.equal(undefined, LocalStorageManager.itineraries);
  });

});