var Itinerary = function(options){
    this.departureAirport = options.departureAirport;
    this.arrivalAirport = options.arrivalAirport;

    this.outboundDate = options.outboundDate;
    this.returnDate = options.returnDate;

    this.destination = options.departureAirport;
    this.checkin = null;
    this.checkout = null;
};

module.exports = Itinerary;