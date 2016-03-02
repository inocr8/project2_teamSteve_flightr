var moment = require('moment');

var Itinerary = function(options){
    this.numberOfPersons = parseInt(options.numberOfPersons);

    this.departureAirport = options.departureAirport;
    this.arrivalAirport = options.arrivalAirport;

    this.outboundDate = moment(options.outboundDate);
    this.returnDate = moment(options.returnDate);

    this.destination = options.arrivalAirport;
    this.checkin = moment(options.checkin) || null;
    this.checkout = moment(options.checkout) || null;
};

Itinerary.prototype = {
    
    updateCheckinCheckoutDates: function(checkin, checkout){
        this.checkin = checkin;
        this.checkout = checkout;
    },

    numberOfNights: function(){
        return this.checkout.diff(this.checkin, 'day');
    },

    updateCheckin: function(date){
        this.checkin = date;
        this.checkinCheckoutUpdated();
    },

    updateCheckout: function(date){
        this.checkout = date;
        this.checkinCheckoutUpdated();
    },

    convertDatesToMoments: function(){
        this.outboundDate = moment(this.outboundDate);
        this.returnDate = moment(this.returnDate);

        this.checkin = moment(this.checkin);
        this.checkout = moment(this.checkout);
    }

};

module.exports = Itinerary;