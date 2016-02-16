var moment = require('moment');

var Flight = require('./flight.js');

var FlightsManager = function(){
    this.data = [];
};

FlightsManager.prototype = {

    threeDayQuery: function(itinerary){
        var day =  24 * 60 * 60 * 1000;

        var dates = {
            outbound: {
                prevDay: moment(itinerary.outboundDate).subtract(1, 'day'),
                onDay: moment(itinerary.outboundDate),
                nextDay: moment(itinerary.outboundDate).add(1, 'day')
            },

            return: {
                prevDay: moment(itinerary.returnDate).subtract(1, 'day'),
                onDay: moment(itinerary.returnDate),
                nextDay: moment(itinerary.returnDate).add(1, 'day')
            },
        };

        console.log('prev day', dates.outbound.prevDay);
        console.log('next day', dates.outbound.nextDay);

        var prevDayFlights = this.returnJourneyQuery({
            departureAirport: itinerary.departureAirport,
            arrivalAirport: itinerary.arrivalAirport,

            outboundDate: dates.outbound.prevDay,
            returnDate: dates.return.prevDay
        });

        var onDayFlights = this.returnJourneyQuery(itinerary);

        var nextDayFlights = this.returnJourneyQuery({
            departureAirport: itinerary.departureAirport,
            arrivalAirport: itinerary.arrivalAirport,

            outboundDate: dates.outbound.nextDay,
            returnDate: dates.return.nextDay
        });

        var outboundFlights = {}
        outboundFlights[dates.outbound.prevDay] = prevDayFlights.outboundFlights;
        console.log('previous day flights', prevDayFlights.outboundFlights);
        outboundFlights[dates.outbound.onDay] = onDayFlights.outboundFlights;
        outboundFlights[dates.outbound.nextDay] = nextDayFlights.outboundFlights;

        var returnFlights = {}
        returnFlights[dates.return.prevDay] = prevDayFlights.returnFlights;
        returnFlights[dates.return.onDay] = onDayFlights.returnFlights;
        returnFlights[dates.return.nextDay] = nextDayFlights.returnFlights;

        return {
            outboundFlights: outboundFlights,
            returnFlights: returnFlights
        }

    },

    returnJourneyQuery: function(itinerary){
        
        var outgoingRequest = {
            departure: itinerary.departureAirport,
            arrival: itinerary.arrivalAirport,
            departing: itinerary.outboundDate
        };

        var outboundFlights = this.flightQuery(outgoingRequest);

        var returnRequest = {
            departure: itinerary.arrivalAirport,
            arrival: itinerary.departureAirport,
            departing: itinerary.returnDate
        };

        var returnFlights = this.flightQuery(returnRequest);

        return {
            outboundFlights: this.sortByDeparting(outboundFlights),
            returnFlights: this.sortByDeparting(returnFlights)
        };
    },

    flightQuery: function(options){
        var self = this;

        var departure = options.departure;
        var arrival = options.arrival;
        var departing = options.departing;
        var arriving = options.arriving;

        return this.data.filter(function(flight){
            if (departure && flight.departure !== departure)
                return false;
            if (arrival && flight.arrival !== arrival)
                return false;
            if (departing && !flight.departing.isSame(departing, 'day'))
                return false;
            if (arriving && !flight.arriving.isSame(arriving, 'day'))
                return false;
            return true;
        });
    },

    sortByPrice: function(flights){
        return flights.sort(function(a, b){
            return a.price - b.price;
        });
    },

    sortByDeparting: function(flights){
        return flights.sort(function(a, b){
            return a.departing - b.departing;
        });
    },

    cheapestFlight: function(flights){
        return this.sortByPrice(flights)[0];
    },

    earliestFlight: function(flights){
        return this.sortByDeparting(flights)[0];
    },

    addFlight: function(flight){
        this.data.push(new Flight(flight));
    },

    addFlights: function(flightsArray){
        for (flight of flightsArray) {
            this.addFlight(flight);
        }
    }
};



module.exports = FlightsManager;