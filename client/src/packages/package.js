var Package = function(options){
    this.itinerary = options.itinerary;
    this.outboundFlight = options.outboundFlight;
    this.returnFlight = options.returnFlight;
    this.hotel = options.hotel;
};

Package.prototype = {
    totalPrice: function(){
        var total
        = this.outboundFlight.price
        + this.returnFlight.price;

        return total;
    }
};

module.exports = Package;