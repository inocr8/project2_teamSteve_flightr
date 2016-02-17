var Package = require('./package.js');

var HotelsManager = require('../hotels/hotelsManager.js');
var FlightsManager = require('../flights/flightsManager.js');

var PackageOptions = function(options){
    this.itinerary = options.itinerary;

    this.outboundFlights = options.outboundFlights;
    this.returnFlights = options.returnFlights;

    this.threeDayFlights = options.threeDayFlights;

    this.hotels = options.hotels;

    this.bestValuePackage = this.createBestValuePackage(this);
    this.currentPackage = new Package(this.bestValuePackage);
};

PackageOptions.prototype = {

    createBestValuePackage: function(){
        var bestValuePackage = new Package({
            itinerary: this.itinerary,
            outboundFlight: FlightsManager.prototype.cheapestFlight(this.outboundFlights),
            returnFlight: FlightsManager.prototype.cheapestFlight(this.returnFlights),
            hotel: this.hotels[0]
        });

        return bestValuePackage;
    },

    sortHotelsByPriceAsc: function(){
        this.hotels = HotelsManager.prototype.sortByPriceAsc(this.hotels);
    },

    sortHotelsByPriceDesc: function(){
        this.hotels = HotelsManager.prototype.sortByPriceDesc(this.hotels);
    },

    sortHotelsByStarsAsc: function(){
        this.hotels = HotelsManager.prototype.sortByStarsAsc(this.hotels);
    },

    sortHotelsByStarsDesc: function(){
        this.hotels = HotelsManager.prototype.sortByStarsDesc(this.hotels);
    },


    updateCurrentPackageOutboundFlight: function(flight){
        this.currentPackage.updateOutboundFlight(flight);
    },

    updateCurrentPackageReturnFlight: function(flight){
        this.currentPackage.updateReturnFlight(flight);
    },

    updateCurrentPackageHotel: function(key){
        var hotel = this.hotels[key];
        this.currentPackage.updateHotel(hotel);
        return hotel;
    },

    findOutboundFlightByDayAndKey: function(day, key){
        return this.threeDayFlights.outboundFlights[day][key];
    },

    findReturnFlightByDayAndKey: function(day, key){
        return this.threeDayFlights.returnFlights[day][key];
    }

};

module.exports = PackageOptions;
