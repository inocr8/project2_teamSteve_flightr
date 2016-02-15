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

        itinerary.checkin = flights.outboundFlights[0].arriving;
        itinerary.checkout = flights.returnFlights[0].departing;
        console.log('destination', itinerary.destination);

        var hotels = this.hotelsManager.hotelsByCity(itinerary.destination);
        console.log('hotels', hotels);

        var options = {
            itinerary: itinerary,
            outboundFlights: flights.outboundFlights,
            returnFlights: flights.returnFlights,
            hotels: hotels,
        };

        var packageOptions = new PackageOptions(options);
        this.packageOptions = packageOptions;

        // console.log('packages', packages);

        return packageOptions;
    },


};

module.exports = PackagesManager;