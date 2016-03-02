var FlightsManager = require('../flightsManager.js');
var outgoingFlightsData = require('./outgoing_flights_test_data.json');
var returnFlightsData = require('./return_flights_test_data.json');
var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var moment = require('moment');
chai.use(require('chai-datetime'));

describe('Flights Manager', function(){
    beforeEach(function createFlights(){
        flights = new FlightsManager();
    });

    it('should have no data at start', function(){
        expect(flights.data).to.deep.equal([]);
    });

    it('should be able to add a flight, with corrected formated date', function(){
        var flight = outgoingFlightsData[0];
        flights.addFlight(flight);

        var departingDate = moment('2016-03-28T08:00:00');
        departingDate._isValid = true;
        
        expect(flights.data[0].departure).to.equal("Edinburgh");
        expect(flights.data[0].departing).to.deep.equal(departingDate);
    });

    it('should be able to add multiple flight', function(){
        flights.addFlights(outgoingFlightsData);
        expect(flights.data[0].departure).to.equal("Edinburgh");
        expect(flights.data[1].departure).to.equal("Edinburgh");
    });
});

describe('Flights with Data Outgoing', function(){
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
        var flightPriceTest = flights.sortByPrice(flights.data)[0];
        var dateDepart = moment("2016-03-28T11:00:00");
        dateDepart._isValid = true;
        var dateArrive = moment("2016-03-29T13:00:00");
        dateArrive._isValid = true;
        assert.equal("Edinburgh", flightPriceTest.departure);
        assert.equal("Canberra", flightPriceTest.arrival);
        expect(flightPriceTest.departing).to.deep.equal(dateDepart);
        expect(flightPriceTest.arriving).to.deep.equal(dateArrive);
    });

    it('should sort flights by departing, earliest to latest', function(){
        var sortedFlights = flights.sortByDeparting(flights.data);
        var earliestFlight = sortedFlights[0];
        expect(earliestFlight.departure).to.equal('Edinburgh');
        expect(earliestFlight.arrival).to.equal('Sydney');
        expect(earliestFlight.price).to.equal(310);
    });

    it('should find the cheapest flight', function(){
        var cheapestFlight = flights.cheapestFlight(flights.data);
        expect(cheapestFlight.price).to.equal(212);
    });

    it('should find the earliest flight', function(){
        var earliestFlight = flights.earliestFlight(flights.data);
        expect(earliestFlight.departure).to.equal('Edinburgh');
        expect(earliestFlight.arrival).to.equal('Sydney');
        expect(earliestFlight.price).to.equal(310);
    }); 

   


});

describe('Flights with Data Both Ways', function(){
    beforeEach(function createFlightsAndSeedData(){
        flights = new FlightsManager();
        flights.addFlights(outgoingFlightsData);
        flights.addFlights(returnFlightsData);
    });

    it('should have a departure and arrival city name on both directions', function(){
        var outgoingFlightCity = ["Edinburgh", "Melbourne"];
        var incomingFlightCity = ["Melbourne", "Edinburgh"];
        assert.equal(outgoingFlightCity[0], flights.data[0].departure);
        assert.equal(outgoingFlightCity[1], flights.data[0].arrival);
        assert.equal(incomingFlightCity[0], flights.data[6].departure);
        assert.equal(incomingFlightCity[1], flights.data[6].arrival);
    });

    it('should have a price on both directions', function(){
        assert.equal(248, flights.data[0].price);
        assert.equal(248, flights.data[6].price);
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
