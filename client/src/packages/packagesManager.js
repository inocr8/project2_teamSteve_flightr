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


        var threeDayFlights = this.flightsManager.threeDayQuery(itinerary);
        console.log('threeDayFlights', threeDayFlights);

        var checkin = flights.outboundFlights[0].arriving;
        var checkout = flights.returnFlights[0].departing;

        itinerary.updateCheckinCheckoutDates(checkin, checkout);

        console.log('destination', itinerary.destination);

        var hotels = this.hotelsManager.hotelsByCity(itinerary.destination);
        console.log('hotels', hotels);

        var options = {
            itinerary: itinerary,

            threeDayFlights: threeDayFlights,

            prevDayOutboundFlights: prevDayFlights.outboundFlights,
            outboundFlights: flights.outboundFlights,
            nextDayOutboundFlights: nextDayFlights.outboundFlights,

            prevDayReturnFlights: prevDayFlights.returnFlights,
            returnFlights: flights.returnFlights,
            nextDayReturnFlights: nextDayFlights.returnFlights,

            hotels: hotels
        };

        var packageOptions = new PackageOptions(options);
        this.packageOptions = packageOptions;

        // console.log('packages', packages);

        return packageOptions;
    },


};

module.exports = PackagesManager;