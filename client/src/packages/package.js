var Package = function(options){
    this.itinerary = options.itinerary;
    this.outboundFlight = options.outboundFlight;
    this.returnFlight = options.returnFlight;
    this.hotel = options.hotel;

    this.totalPricePerPerson = this.calcTotalPricePerPerson();
    this.totalPrice = this.calcTotalPrice();

    // this.dates = this.formatDates();
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