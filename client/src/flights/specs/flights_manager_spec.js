var FlightsManager = require('../flightsManager.js');
var outgoingFlightsData = require('./outgoing_flights_test_data.json');
var returnFlightsData = require('./return_flights_test_data.json');
var expect = require('chai').expect;

describe('Flights', function(){
    beforeEach(function createFlights(){
        flights = new FlightsManager();
    });

    it('should have no data at start', function(){
        expect(flights.data).to.deep.equal([]);
    });

    it('should return true for date equality, ignoring time', function(){
        var date1 = new Date("2016-03-28T08:00:00");
        var date2 = new Date("2016-03-28T12:30:00");
        var bool = flights.sameDay(date1, date2);
        expect(bool).to.equal(true);
    });

    it('should be able to add a flight, with corrected formated date', function(){
        var flight = outgoingFlightsData[0];
        flights.addFlight(flight);
        expect(flights.data[0].departure).to.equal("Edinburgh");
        expect(flights.data[0].departing).to.deep.equal(new Date('Mon, 28 Mar 2016 08:00:00 GMT'));
    });

    it('should be able to add multiple flight', function(){
        flights.addFlights(outgoingFlightsData);
        expect(flights.data[0].departure).to.equal("Edinburgh");
        expect(flights.data[1].departure).to.equal("Edinburgh");
    });
});

describe('Flights', function(){
    beforeEach(function createFlightsAndSeedData(){
        flights = new FlightsManager();
        flights.addFlights(outgoingFlightsData);
    });

    it('should return flight(s), given criteria of departing, arriving, departure, arrival', function(){
        var options = {
            departing: new Date('2016-03-28'),
            arriving: new Date('2016-03-29'),
            departure: 'Edinburgh',
            arrival: 'Melbourne'
        }
        var queriedFlights = flights.flightQuery(options);
        expect(queriedFlights.length).to.equal(2);
    });

    it('should return flight(s), given departure', function(){
        var options = {
            departure: 'Edinburgh'
        }
        var queriedFlights = flights.flightQuery(options);
        expect(queriedFlights.length).to.equal(6);
    });

    it('should return flight(s), given arrival', function(){
        var options = {
            arrival: 'Sydney'
        }
        var queriedFlights = flights.flightQuery(options);
        expect(queriedFlights.length).to.equal(2);
    });

    it('should return flight(s), given departure and departing', function(){
        var options = {
            departure: 'Edinburgh',
            departing: new Date('2016-03-28')
        }
        var queriedFlights = flights.flightQuery(options);
        expect(queriedFlights.length).to.equal(6);
    });

    it('should sort flight by price, lowest to highest', function(){
        var flight1 = flights.data[0];
        var flight2 = flights.data[1];
        var flightsArray = [flight2, flight1];
        var sortedArray = flights.sortByPrice(flightsArray);
        expect(sortedArray[0]).to.deep.equal(flight1);
    });

    it('should sort all flights by price, lowest to highest', function(){
        expect(flights.sortByPrice(flights.data)[0]).to.deep.equal({
            "departure": "Edinburgh",
            "arrival": "Canberra",
            "departing": new Date("2016-03-28T11:00:00"),
            "arriving": new Date("2016-03-29T13:00:00"),
            "price": 212
        });
    });

});

describe('Flights', function(){
    beforeEach(function createFlightsAndSeedData(){
        flights = new FlightsManager();
        flights.addFlights(outgoingFlightsData);
        flights.addFlights(returnFlightsData);
    });

    it('should return outgoing flights and return flights, given journey itinerary', function(){
        var itinerary = {
            departureAirport: "Edinburgh",
            arrivalAirport: "Canberra",
            outboundDate: new Date("2016-03-28T11:00:00"),
            returnDate: new Date("2016-04-11T13:00:00")
        };
        var journeys = flights.returnJourneyQuery(itinerary);
        // console.log('journeys', journeys);
        expect(journeys.outboundFlights.length).to.equal(2);
        expect(journeys.returnFlights.length).to.equal(2);
    });
});
