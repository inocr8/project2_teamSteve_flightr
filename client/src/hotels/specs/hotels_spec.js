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

  it('should sort hotel by price, from lowest to highest', function(){
    var hotel1 = hotels.data[0];
    var hotel2 = hotels.data[1];
    var hotelsArray = [hotel2, hotel1];
    var sortedArray = hotels.sortByPrice(hotelsArray);
    expect(sortedArray[0]).to.deep.equal(hotel1);
  });

  it('should sort all hotels by price, from lowest to highest', function(){
    var hotelsArray = hotelData;
    var sortedArray = hotels.sortByPrice(hotelsArray);
    expect(sortedArray[0]).to.deep.equal({
      "name": "Bargain Hostel",
      "pricePerPerson": 12,
      "rooms": 60,
      "stars": 1,
      "address": {
        "building": "7",
        "street": "Harbour Lane",
        "city": "Melbourne",
        "zip": 5789046
      }
    });
  });

});