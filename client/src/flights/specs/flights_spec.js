var FlightsModel = require('../flightsModel.js');
var expect = require('chai').expect;

describe('Flights', function(){

    it('should have no data at start', function(){
        var flights = new FlightsModel();
        expect(flights.data).to.deep.equal([]);
    });

});