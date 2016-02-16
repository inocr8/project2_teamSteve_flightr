var moment = require('moment');

var Flight = function(options){
    this.departure = options.departure;
    this.arrival = options.arrival;
    this.departing = this.parseDate(options.departing);
    this.arriving = this.parseDate(options.arriving),
    this.price = options.price;

    this.displayDates = this.formatDisplayDates(this.departing, this.arriving);
}

Flight.prototype = {
    parseDate: function(string){
        // expecting: "28-03-2016 T12:00:00"
        // returning: "2016-03-28T12:00:00"
        var array = string.split(' ');

        var date = array[0];
        var time = array[1];

        var dateArray = date.split('-');

        var day = dateArray[0];
        var month = dateArray[1];
        var year = dateArray[2];

        var dateString = year + '-' + month + '-' + day + time;

        return moment(dateString);
    },

    formatDisplayDates: function(departing, arriving){

        return {
            departing: {
                date: departing.format('ddd DD MMM YYYY'),
                time: departing.format('HH:mm')
            },
            arriving: {
                date: arriving.format('ddd DD MMM YYYY'),
                time: arriving.format('HH:mm')
            }
        };
    }
};

module.exports = Flight;