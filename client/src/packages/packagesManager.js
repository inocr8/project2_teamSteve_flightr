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

        var day =  24 * 60 * 60 * 1000;
        var nextDayFlights = this.flightsManager.returnJourneyQuery({
            departureAirport: itinerary.departureAirport,
            arrivalAirport: itinerary.arrivalAirport,

            outboundDate: new Date(itinerary.outboundDate.getTime() + day),
            returnDate: new Date(itinerary.returnDate.getTime() + day)
        });

        var prevDayFlights = this.flightsManager.returnJourneyQuery({
            departureAirport: itinerary.departureAirport,
            arrivalAirport: itinerary.arrivalAirport,

            outboundDate: new Date(itinerary.outboundDate.getTime() - day),
            returnDate: new Date(itinerary.returnDate.getTime() - day)
        });

        console.log('nextDayFlights', nextDayFlights);
        console.log('prevDayFlights', prevDayFlights);

        var checkin = flights.outboundFlights[0].arriving;
        var checkout = flights.returnFlights[0].departing;

        itinerary.updateCheckinCheckoutDates(checkin, checkout);

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