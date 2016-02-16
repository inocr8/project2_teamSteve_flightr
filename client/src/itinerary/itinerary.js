var Itinerary = function(options){
    this.numberOfPersons = options.numberOfPersons;

    this.departureAirport = options.departureAirport;
    this.arrivalAirport = options.arrivalAirport;

    this.outboundDate = options.outboundDate;
    this.returnDate = options.returnDate;

    this.displayDates = null

    this.destination = options.arrivalAirport;
    this.checkin = null;
    this.checkout = null;
    this.numberOfNights = null;
};

Itinerary.prototype = {
    updateCheckinCheckoutDates: function(checkin, checkout){
        this.checkin = checkin;
        this.checkout = checkout;
        this.formatDisplayDates();
        this.updateNumberOfNights();
    },

    formatDisplayDates: function(){
        var dateOptions = {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };
        this.displayDates =  {
            outboundDate: this.outboundDate.toLocaleDateString('en-GB', dateOptions),
            returnDate: this.returnDate.toLocaleDateString('en-GB', dateOptions),
            checkin: this.checkin.toLocaleDateString('en-GB', dateOptions),
            checkout: this.checkout.toLocaleDateString('en-GB', dateOptions)
        };
    },

    updateNumberOfNights: function(){
        this.numberOfNights = this.calcNumberOfNights(this.checkin, this.checkout);
    },

    calcNumberOfNights: function(checkin, checkout){
        var oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs( (checkout.getTime() - checkin.getTime()) / oneDay ));
    },

    updateCheckin: function(date){
        this.checkin = date;
        this.checkinCheckoutUpdated();
    },

    updateCheckout: function(date){
        this.checkout = date;
        this.checkinCheckoutUpdated();
    }

};

module.exports = Itinerary;