var Flight = require('./flight.js');

var FlightsManager = function(){
    var self = this;
    self.data = [];
};

FlightsManager.prototype = {

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