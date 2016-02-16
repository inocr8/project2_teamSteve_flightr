var Flight = require('./flight.js');

var FlightsManager = function(){
    var self = this;
    self.data = [];
};

FlightsManager.prototype = {

    threeDayQuery: function(itinerary){
        var day =  24 * 60 * 60 * 1000;

        var dates = {
            outbound: {
                prevDay: new Date(itinerary.outboundDate.getTime() - day),
                onDay: itinerary.outboundDate,
                nextDay: new Date(itinerary.outboundDate.getTime() + day)
            },

            return: {
                prevDay: new Date(itinerary.returnDate.getTime() - day),
                onDay: itinerary.returnDate,
                nextDay: new Date(itinerary.returnDate.getTime() + day)
            },
        };

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
            outboundFlights: this.sortByPrice(outboundFlights),
            returnFlights: this.sortByPrice(returnFlights)
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
            if (departing && !self.sameDay(flight.departing, departing))
                return false;
            if (arriving && !self.sameDay(flight.arriving, arriving))
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
    },

    sameDay: function(date1, date2){
        return date1.getDate() === date2.getDate()
            && date1.getMonth() === date2.getMonth()
            && date1.getFullYear() === date2.getFullYear();
    }
};



module.exports = FlightsManager;