var moment = require('moment');

var Package = require('./package.js');
var PackageOptions = require('./packageOptions.js');

var PackagesManager = function(flightsManager, hotelsManager){
    this.flightsManager = flightsManager;
    this.hotelsManager = hotelsManager;

    this.packageOptions = undefined;
};

PackagesManager.prototype = {

    createPackageOptions: function(itinerary){

        var flights = this.flightsManager.returnJourneyQuery(itinerary);

        var threeDayFlights = this.flightsManager.threeDayQuery(itinerary);

        var checkin = moment(flights.outboundFlights[0].arriving);
        var checkout = moment(flights.returnFlights[0].departing);

        itinerary.updateCheckinCheckoutDates(checkin, checkout);

        var hotels = this.hotelsManager.hotelsByCity(itinerary.destination);

        console.log('itinerary moment?', itinerary.outboundDate);

        var options = {
            itinerary: itinerary,

            threeDayFlights: threeDayFlights,

            outboundFlights: flights.outboundFlights,

            returnFlights: flights.returnFlights,
  

            hotels: hotels
        };

        var packageOptions = new PackageOptions(options);
        this.packageOptions = packageOptions;

        // console.log('packages', packages);

        return packageOptions;
    },


};

module.exports = PackagesManager;