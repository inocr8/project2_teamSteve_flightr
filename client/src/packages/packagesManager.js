var Package = require('./package.js');

var PackagesManager = function(flightsManager, hotelsManger){
    this.flightsManager = flightsManager;
    // this.hotels = hotelsModel;
};

PackagesManager.prototype = {

    createPackageOptions: function(itinerary){

        var flights = this.flightsManager.returnJourneyQuery(itinerary);

        itinerary.checkin = flights.outboundFlights[0].arriving;
        itinerary.checkout = flights.returnFlights[0].departing;

        // var hotels = this.hotels.hotelQuery(itinerary);

        var packageOptions = {
            itinerary: itinerary,
            outboundFlights: flights.outboundFlights,
            returnFlights: flights.returnFlights,
            // hotels: hotels
        };

        // console.log('packages', packages);

        return packageOptions;
    },

    bestValuePackage: function(packageOptions){

        var bestValuePackage = new Package({
            itinerary: packageOptions.itinerary,
            outboundFlight: packageOptions.outboundFlights[0],
            returnFlight: packageOptions.returnFlights[0],
            // hotel: packageOptions.hotels[0]
        });

        return bestValuePackage;
    }

    // nextDayOptions: function(){

    // },

    // previousDayOptions: function(){
        
    // }
};

module.exports = PackagesManager;