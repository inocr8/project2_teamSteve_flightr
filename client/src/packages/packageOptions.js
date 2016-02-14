var Package = require('./package.js');

var PackageOptions = function(options){
    this.itinerary = options.itinerary;

    this.outboundFlights = options.outboundFlights;
    this.returnFlights = options.returnFlights;

    this.hotels = options.hotels;

    this.bestValuePackage = this.createBestValuePackage(this);
    this.currentPackage = new Package(this.bestValuePackage);
};

PackageOptions.prototype = {

    createBestValuePackage: function(){

        var bestValuePackage = new Package({
            itinerary: this.itinerary,
            outboundFlight: this.outboundFlights[0],
            returnFlight: this.returnFlights[0],
            hotel: this.hotels[0]
        });

        return bestValuePackage;
    },

    updateCurrentPackageOutboundFlight: function(key){
        var flight = this.outboundFlights[key];
        this.currentPackage.outboundFlight = flight;
    },

    updateCurrentPackageReturnFlight: function(key){
        var flight = this.returnFlights[key];
        this.currentPackage.returnFlight = flight;
    }


};

module.exports = PackageOptions;
