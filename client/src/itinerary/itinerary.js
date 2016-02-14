var Itinerary = function(options){
    this.numberOfPersons = options.numberOfPersons;

    this.departureAirport = options.departureAirport;
    this.arrivalAirport = options.arrivalAirport;

    this.outboundDate = options.outboundDate;
    this.returnDate = options.returnDate;

    this.dates = this.formatDates(this.outboundDate, this.returnDate);

    this.destination = options.arrivalAirport;
    this.checkin = null;
    this.checkout = null;
};

Itinerary.prototype = {
    formatDates: function(outboundDate, returnDate){
        var dateOptions = {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };
        return {
            outboundDate: outboundDate.toLocaleDateString('en-GB', dateOptions),
            returnDate: returnDate.toLocaleDateString('en-GB', dateOptions)
        };
    }
};

module.exports = Itinerary;