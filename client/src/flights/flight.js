var Flight = function(options){
    this.departure = options.departure;
    this.arrival = options.arrival;
    this.departing = this.parseDate(options.departing);
    this.arriving = this.parseDate(options.arriving),
    this.price = options.price;

    this.dates = this.formatDates(this.departing, this.arriving);
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

        return new Date(dateString);
    },

    formatDates: function(departing, arriving){
        var options = {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };
        return {
            departing: {
                date: departing.toLocaleDateString('en-GB', options),
                time: departing.toLocaleTimeString()
            },
            arriving: {
                date: arriving.toLocaleDateString('en-GB', options),
                time: arriving.toLocaleTimeString()
            }
        };
    }
};

module.exports = Flight;