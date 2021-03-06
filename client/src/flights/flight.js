var moment = require('moment');

var Flight = function(options){
    this.departure = options.departure;
    this.arrival = options.arrival;
    this.departing = this.parseDate(options.departing);
    this.arriving = this.parseDate(options.arriving),
    this.price = parseInt(options.price);

    this.length = this.calculateLength(this.departing, this.arriving);

    this.displayDates = this.formatDisplayDates(this.departing, this.arriving, this.length);
};

Flight.prototype = {
    parseDate: function(string){
        // expecting: "28-03-2016 T12:00:00"
        // returning: "2016-03-28T12:00:00"
        // console.log('moment?', moment(string));
        var date = moment(string);
        if (date.isValid()) return date;

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

    formatDisplayDates: function(departing, arriving, length){

        return {
            departing: {
                date: departing.format('ddd DD MMM YYYY'),
                time: departing.format('HH:mm')
            },
            arriving: {
                // date: arriving.format('ddd DD MMM YYYY'),
                // time: arriving.format('HH:mm')
                    time: this.timeAtDestination(arriving),
                    date: this.dateAtDestination(arriving)
            },
            length: this.formatLength(length)
        };
    },

    calculateLength: function(departing, arriving){
        return arriving.diff(departing, 'm');
    },

    formatLength: function(lengthInMinutes){
        var hours = Math.floor(lengthInMinutes / 60);
        var minutes = lengthInMinutes % 60;

        var string = hours + 'h';
        if (minutes !== 0)
            string += ' ' + minutes;
        return string;
    },

    timeAtDestination: function(arriving){
        var arrTime = moment(arriving).format('HH:mm');
        return arrTime;
    },

    dateAtDestination: function(arriving){
        var arrDate = moment(arriving).format('DD MMM');
        return arrDate;
    }




};

module.exports = Flight;