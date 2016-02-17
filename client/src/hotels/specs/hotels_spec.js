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

  it('should have a name, address and zip code', function(){
    var hotel = hotelData[0];
    hotels.addHotel(hotel);
    assert.equal("The Plaza", hotels.data[0].name);
    expect(hotels.data[0]).to.deep.equal({
      "name": "The Plaza",
      "pricePerPerson": 32,
      "rooms": 10,
      "stars": 3,
      "address": {
        "building": "3",
        "street": "Park Avenue",
        "city": "Melbourne",
        "zip": 3498890,
        "lat": -37.827028986826775,
        "lng": 144.95683343238613,
        "latLng": {"lat": -37.827028986826775, "lng": 144.95683343238613}
      }
    });
  });

  it('should have a price per person to rent room', function(){
    var hotel = hotelData[0];
    hotels.addHotel(hotel);
    assert.equal(32, hotels.data[0].pricePerPerson);
  });

  it('should have a star rating as an integer', function(){
    var hotel = hotelData[0];
    hotels.addHotel(hotel);
    expect(hotels.data[0].stars).to.be.an('number');
  });

  it('should have a number of rooms as an integer and greater than zero', function(){
    var hotel = hotelData[0];
    hotels.addHotel(hotel);
    expect(hotels.data[0].rooms).to.be.an('number');
    expect(hotels.data[0].rooms).to.be.above(0);
  });

  it('should have a latitude and longitude map position', function(){
    var hotel = hotelData[0];
    hotels.addHotel(hotel);
    expect(hotels.data[0].address.lat).to.be.an('number');
    expect(hotels.data[0].address.lng).to.be.an('number');
    assert.equal(-37.827028986826775, hotels.data[0].address.lat);
    assert.equal(144.95683343238613, hotels.data[0].address.lng);
  });

  it('should have a latLng object when created', function(){
    var hotel = hotelData[0];
    hotels.addHotel(hotel);
    expect(hotels.data[0].address.latLng).to.be.an('object');
  })

  it('should sort hotel by price, from lowest to highest', function(){
    var hotel1 = hotelData[0];
    var hotel2 = hotelData[1];
    var hotelArray = [hotel2, hotel1];
    hotelArray.forEach(function(hotel){
      hotels.addHotel(hotel);
    });
    hotels.sortByPriceAsc(hotels.data);
    expect(hotels.data[0]).to.deep.equal(hotel1);
  });

  it('should sort hotel by price, from highest to lowest', function(){
    var hotel1 = hotelData[0];
    var hotel2 = hotelData[1];
    var hotelArray = [hotel2, hotel1];
    hotelArray.forEach(function(hotel){
      hotels.addHotel(hotel);
    });
    hotels.sortByPriceDesc(hotels.data);
    expect(hotels.data[0]).to.deep.equal(hotel2);
  });

  it('should sort all hotels by price, from lowest to highest', function(){
    hotelData.forEach(function(hotel){
      hotels.addHotel(hotel);
    });
    var hotelTest = hotelData[2];
    hotels.sortByPriceAsc(hotels.data);
    expect(hotels.data[0]).to.deep.equal(hotelTest);
  });

  it('should sort all hotels by price, from highest to lowest', function(){
    hotelData.forEach(function(hotel){
      hotels.addHotel(hotel);
    });
    var hotelTest = hotelData[1];
    hotels.sortByPriceDesc(hotels.data);
    expect(hotels.data[0]).to.deep.equal(hotelTest);
  });

  it('should sort all hotels by stars, from lowest to highest', function(){
    hotelData.forEach(function(hotel){
      hotels.addHotel(hotel);
    });
    var hotelTest = hotelData[2];
    hotels.sortByStarsAsc(hotels.data);
    expect(hotels.data[0]).to.deep.equal(hotelTest);
  });

  it('should sort all hotels by stars, from highest to lowest', function(){
    hotelData.forEach(function(hotel){
      hotels.addHotel(hotel);
    });
    var hotelTest = hotelData[1];
    hotels.sortByStarsDesc(hotels.data);
    expect(hotels.data[0]).to.deep.equal(hotelTest);
  });

  it('should return the cheapest price from all prices', function(){
    hotelData.forEach(function(hotel){
      hotels.addHotel(hotel);
    });
    hotels.sortByPriceAsc(hotels.data);
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