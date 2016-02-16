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
        if (!moment(this.outboundFlight.arriving).isSame(this.itinerary.checkin)) {
            var newDay = moment(this.outboundFlight.arriving).startOf('day');

            console.log('new day', newDay);
            this.itinerary.updateCheckin(newDay);
        }
        this.outboundFlightUpdated();
    },

    sameDay: function(date1, date2){
        return date1.getDate() === date2.getDate()
            && date1.getMonth() === date2.getMonth()
            && date1.getFullYear() === date2.getFullYear();
    },

    updateReturnFlight: function(flight){
        this.returnFlight = flight;
        this.returnFlightUpdated();
    },

    updateHotel: function(hotel){
        this.hotel = hotel;
        this.hotelUpdated();
    }

    // formatDates: function(){
    //     return {
    //         outboundFlight: {
    //             departing:this.outboundFlight.departing.toDateString(),
    //             arriving: this.outboundFlight.arriving.toDateString()
    //         },
    //         returnFlight: {
    //             departing: this.returnFlight.departing.toDateString(),
    //             arriving: this.returnFlight.arriving.toDateString()
    //         }
    //     }
    // }

    // summary: function(){

    // }
};

module.exports = Package;