var Itinerary = function(options){
    this.numberOfPersons = options.numberOfPersons;

    this.departureAirport = options.departureAirport;
    this.arrivalAirport = options.arrivalAirport;

    this.outboundDate = options.outboundDate;
    this.returnDate = options.returnDate;

    this.displayDates = this.formatDisplayDates(this.outboundDate, this.returnDate);

    this.destination = options.arrivalAirport;
    this.checkin = null;
    this.checkout = null;
};

Itinerary.prototype = {
    formatDisplayDates: function(outboundDate, returnDate){
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