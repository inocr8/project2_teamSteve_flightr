var Itinerary = function(options){
    this.departureAirport = options.departureAirport;
    this.arrivalAirport = options.arrivalAirport;

    this.outboundDate = options.outboundDate;
    this.returnDate = options.returnDate;

    this.destination = options.arrivalAirport;
    this.checkin = null;
    this.checkout = null;
};

module.exports = Itinerary;