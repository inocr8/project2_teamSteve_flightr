var HotelsManager = require('../hotelsManager.js');
var hotelData = require('./hotels_test_data.json')
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Hotels', function(){
  beforeEach(function createHotels(){
    hotels = new HotelsManager();
  });

  it('should start off with no data', function(){
    assert.equal(0, hotels.data.length);
  });

  it('should be able to add hotel data', function(){
    var hotel = hotelData[0];
    hotels.addHotel(hotel);
    assert.equal(1, hotels.data.length);
  });

  // it('shoul

})