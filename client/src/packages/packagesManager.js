var Package = require('./package.js');

var PackagesManager = function(flightsManager, hotelsManager){
    this.flightsManager = flightsManager;
    this.hotelsManager = hotelsManager;
};

PackagesManager.prototype = {

    createPackageOptions: function(itinerary){

        var flights = this.flightsManager.returnJourneyQuery(itinerary);

        itinerary.checkin = flights.outboundFlights[0].arriving;
        itinerary.checkout = flights.returnFlights[0].departing;
        console.log('destination', itinerary.destination);

        var hotels = this.hotelsManager.hotelsByCity(itinerary.destination);
        console.log('hotels', hotels);
        var hotels = this.hotelsManager.sortByPrice(hotels);

        var packageOptions = {
            itinerary: itinerary,
            outboundFlights: flights.outboundFlights,
            returnFlights: flights.returnFlights,
            hotels: hotels
        };

        // console.log('packages', packages);

        return packageOptions;
    },

    bestValuePackage: function(packageOptions){

        var bestValuePackage = new Package({
            itinerary: packageOptions.itinerary,
            outboundFlight: packageOptions.outboundFlights[0],
            returnFlight: packageOptions.returnFlights[0],
            hotel: packageOptions.hotels[0]
        });

        console.log('best', bestValuePackage);

        return bestValuePackage;
    }

    // nextDayOptions: function(){

    // },

    // previousDayOptions: function(){
        
    // }
};

module.exports = PackagesManager;