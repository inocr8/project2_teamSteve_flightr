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
            var newCheckin = this.outboundFlight.arriving.startOf('day');
            this.itinerary.updateCheckin(newCheckin);
        }
        // notifies view of update
        this.outboundFlightUpdated();
    },

    updateReturnFlight: function(flight){
        this.returnFlight = flight;
        if (!this.returnFlight.departing.isSame(this.itinerary.checkout, 'day')) {
            var newCheckout = this.returnFlight.departing.startOf('day');
            this.itinerary.updateCheckout(newCheckout);
        }
        // notifies view of update
        this.returnFlightUpdated();
    },

    updateHotel: function(hotel){
        this.hotel = hotel;
        // notifies view of update
        this.hotelUpdated();
    }
};

module.exports = Package;