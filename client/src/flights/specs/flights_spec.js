var FlightsModel = require('../flightsModel.js');
var flightData = require('./flights_test_data')
var expect = require('chai').expect;

describe('Flights', function(){

    beforeEach(function createFlights(){
        flights = new FlightsModel(flightData)
    });

    it('should have seeded data at start', function(){
        expect(flights.data).to.deep.equal(flightData);
    });

});