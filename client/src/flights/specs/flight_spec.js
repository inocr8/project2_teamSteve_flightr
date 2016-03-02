var Flight = require('../flight.js');
var outgoingFlightsData = require('./outgoing_flights_test_data.json');
var returnFlightsData = require('./return_flights_test_data.json');
var chai = require('chai');
var expect = require('chai').expect;
var moment = require('moment');
var moment_timezone = require('moment-timezone');
chai.use(require('chai-datetime'));



describe('Flight', function(){
    it('should be able to parse date', function(){
        var departing = '28-03-2016 T08:00:00';
        var date = Flight.prototype.parseDate(departing);
        expect(date).to.deep.equal(moment('2016-03-28T08:00:00'));
    });

    it('should be able to format display dates', function(){
        var departing = moment('2016-03-28T08:00:00');
        var arriving = moment('Tue, 29 Mar 2016 10:00:00 GMT');
        var length = arriving.diff(departing, 'm');

        var dates = Flight.prototype.formatDisplayDates(departing, arriving, length);
        expect(dates).to.deep.equal({ 
            departing: 
                { 
                    date: 'Mon 28 Mar 2016', 
                    time: '08:00' 
                },
            arriving: 
                { 
                    time: '11:00',
                    date: '29 Mar' 
                },
            length: '27h' 
        });
    });
    it('should be able to calculate flight length', function(){
        var departing = moment('2016-03-28T08:00:00');
        var arriving = moment('2016-03-29T10:00:00');

        var length = Flight.prototype.calculateLength(departing, arriving);
        expect(length).to.equal(1560);
    });
    it('should format length to display hours minutes, given the length in minutes', function(){
        var length = 1575;
        var displayLength = Flight.prototype.formatLength(length);
        expect(displayLength).to.equal('26h 15');
    });
    it('should not display minutes if flight length is only in hours, given the length in minutes', function(){
        var length = 1560;
        var displayLength = Flight.prototype.formatLength(length);
        expect(displayLength).to.equal('26h');
    });

    it('should display arrival time at destination, given the timezone and flight arrival info in GMT', function(){
        var date = 'Tue, 29 Mar 2016 18:00:00 GMT';
        var sydney = moment_timezone(date).tz('Australia/Canberra');
        var timeInAustralia = Flight.prototype.timeAtDestination(sydney);
        expect(timeInAustralia).to.equal('05:00');
    });


    it('should display arrival date at destination, given the timezone and flight arrival info in GMT', function(){
        var date = 'Tue, 29 Mar 2016 18:00:00 GMT';
        var sydney = moment_timezone(date).tz('Australia/Canberra');
        var dateInAustralia = Flight.prototype.dateAtDestination(sydney);
        expect(dateInAustralia).to.equal('30 Mar');
    });


});