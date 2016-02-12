var FlightsModel = require('../flightsModel.js');
var flightData = require('./flights_test_data')
var expect = require('chai').expect;

describe('Flights', function(){
    beforeEach(function createFlights(){
        flights = new FlightsModel();
    });

    it('should have no data at start', function(){
        expect(flights.data).to.deep.equal([]);
    });

    it('should parse date into correct JS format', function(){
        var departure = flightData[0].departing;
        var date = flights.parseDate(departure);
        expect(date).to.deep.equal(new Date('Mon, 28 Mar 2016 08:00:00 GMT'));
    });

    it('should be able to add a flight, with corrected formated date', function(){
        var flight = flightData[0];
        flights.addFlight(flight);
        expect(flights.data[0].departure).to.equal("Edinburgh");
        expect(flights.data[0].departing).to.deep.equal(new Date('Mon, 28 Mar 2016 08:00:00 GMT'));
    });

    it('should be able to add multiple flight', function(){
        flights.addFlights(flightData);
        expect(flights.data[0].departure).to.equal("Edinburgh");
        expect(flights.data[1].departure).to.equal("Edinburgh");
    });
});

describe('Flights', function(){
    beforeEach(function createFlights(){
        flights = new FlightsModel();
        flights.addFlights(flightData);
    });
    
});





    // it('should return flight given data, origin, and destination', function(){
    //     var date = '28-03-2016';
    //     var origin = 'Edinburgh';
    //     var destination = 'Melbourne';
    //     var flight = flights.flightQuery(date, origin, destination);
    //     expect(flight).to.deep.equal({
    //         "departure": "Edinburgh",
    //         "arrival": "Melbourne",
    //         "departing": "28-03-2016 T08:00:00",
    //         "arriving": "29-03-2016 T10:00:00",
    //         "price": 248
    //     });
    // });
