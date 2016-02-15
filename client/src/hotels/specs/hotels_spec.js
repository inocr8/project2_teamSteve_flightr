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
    var hotel1 = hotelData[1];
    var hotel2 = hotelData[0];
    hotels.addHotel(hotel1);
    hotels.addHotel(hotel2);
    hotels.sortByPrice();
    expect(hotels.data[0]).to.deep.equal(hotel2);
  });

  it('should sort all hotels by price, from lowest to highest', function(){
    hotelData.forEach(function(hotel){
      hotels.addHotel(hotel);
    });
    hotels.sortByPrice();
    expect(hotels.data[0]).to.deep.equal({
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

  it('should return the cheapest price from all prices', function(){
    hotelData.forEach(function(hotel){
      hotels.addHotel(hotel);
    });
    hotels.sortByPrice();
    hotels.hotelsReturnCheapest();
    assert.equal(12, hotels.hotelsReturnCheapest()[0].pricePerPerson);
  });



  it('should return all hotels from a city', function(){
    hotelData.forEach(function(hotel){
      hotels.addHotel(hotel);
    });
    var hotelsInCanberra = hotels.hotelsByCity('Canberra');
    expect(hotelsInCanberra.length).to.equal(3);
  });

});