var Hotels = require('../hotelsModel');
var hotelTestData = require('./hotels_data_test.json')
var assert = require('chai').assert;

describe('hotels', function(){
  it('Should start off with no data', function(){
    var hotels = new Hotels();
    assert.equal(0, hotels.data.length);
  });
  it('Should be able to add hotel data', function(){
    var hotels = new Hotels();
    var hotel = hotelTestData[0];
    hotels.addHotel(hotel);
    assert.equal(1, hotels.data.length);
  });

})