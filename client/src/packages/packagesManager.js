var moment = require('moment');

var Package = require('./package.js');
var PackageOptions = require('./packageOptions.js');

var PackagesManager = function(flightsManager, hotelsManager){
    this.flightsManager = flightsManager;
    this.hotelsManager = hotelsManager;
};

PackagesManager.prototype = {

    createPackageOptions: function(itinerary){
        var flights = this.flightsManager.returnJourneyQuery(itinerary);

        var threeDayFlights = this.flightsManager.threeDayQuery(itinerary);

        var onDayOutboundFlights = threeDayFlights.outboundFlights[itinerary.outboundDate];
        var onDayReturnFlights = threeDayFlights.returnFlights[itinerary.returnDate];

        var cheapestOutbound = this.flightsManager.cheapestFlight(onDayOutboundFlights);
        var cheapestReturn = this.flightsManager.cheapestFlight(onDayReturnFlights);

        var checkin = moment(cheapestOutbound.arriving);
        var checkout = moment(cheapestReturn.departing);

        itinerary.updateCheckinCheckoutDates(checkin, checkout);

        var hotels = this.hotelsManager.hotelsByCity(itinerary.destination);

        var options = {
            itinerary: itinerary,

            threeDayFlights: threeDayFlights,

            outboundFlights: flights.outboundFlights,
            returnFlights: flights.returnFlights,
  
            hotels: hotels
        };

        return new PackageOptions(options);
    },


};

module.exports = PackagesManager;