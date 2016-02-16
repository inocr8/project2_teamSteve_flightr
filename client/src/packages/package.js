var moment = require('moment');

var Package = function(options){
    this.itinerary = options.itinerary;

    this.outboundFlight = options.outboundFlight;
    this.returnFlight = options.returnFlight;
    this.hotel = options.hotel;

    this.totalPricePerPerson = this.calcTotalPricePerPerson();
    this.totalPrice = this.calcTotalPrice();
};

Package.prototype = {
    calcTotalPricePerPerson: function(){
        var total
        = this.outboundFlight.price
        + this.returnFlight.price
        + this.hotel.pricePerPerson;

        return total;
    },

    calcTotalPrice: function(){
        return this.calcTotalPricePerPerson() * this.itinerary.numberOfPersons;
    },

    updateOutboundFlight: function(flight){
        this.outboundFlight = flight;
        if (!this.outboundFlight.arriving.isSame(this.itinerary.checkin, 'day')) {
            var newDay = this.outboundFlight.arriving.startOf('day');

            console.log('new day', newDay);
            this.itinerary.updateCheckin(newDay);
        }
        this.outboundFlightUpdated();
    },

    updateReturnFlight: function(flight){
        this.returnFlight = flight;
        this.returnFlightUpdated();
    },

    updateHotel: function(hotel){
        this.hotel = hotel;
        this.hotelUpdated();
    }
};

module.exports = Package;