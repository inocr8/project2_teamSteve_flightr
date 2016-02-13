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

    addFlight: function(flight){
        if (typeof flight.departing === 'string')
            flight.departing = this.parseDate(flight.departing);
        if (typeof flight.arriving === 'string')
            flight.arriving = this.parseDate(flight.arriving);
        this.data.push(flight);
    },

    addFlights: function(flightsArray){
        var self = this;
        flightsArray.forEach(function(flight){
            self.addFlight(flight);
        });
    },

    sameDay: function(date1, date2){
        return date1.getDate() === date2.getDate()
            && date1.getMonth() === date2.getMonth()
            && date1.getFullYear() === date2.getFullYear();
    },

    parseDate: function(string){
        // expecting: "28-03-2016 T12:00:00"
        // returning: "2016-03-28T12:00:00"
        var array = string.split(' ');

        var date = array[0];
        var time = array[1];

        var dateArray = date.split('-');

        var day = dateArray[0];
        var month = dateArray[1];
        var year = dateArray[2];

        var dateString = year + '-' + month + '-' + day + time;

        return new Date(dateString);
    }
};



module.exports = FlightsManager;