var Package = function(options){
    this.itinerary = options.itinerary;
    this.outboundFlight = options.outboundFlight;
    this.returnFlight = options.returnFlight;
    this.hotel = options.hotel;
};

Package.prototype = {
    totalPricePerPerson: function(){
        var total
        = this.outboundFlight.price
        + this.returnFlight.price
        + this.hotel.pricePerPerson;

        return total;
    },

    totalPrice: function(){
        return this.totalPricePerPerson() * this.itinerary.numberOfPersons;
    }

    // summary: function(){

    // }
};

module.exports = Package;