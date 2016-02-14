var Flight = require('../flight.js');
var outgoingFlightsData = require('./outgoing_flights_test_data.json');
var returnFlightsData = require('./return_flights_test_data.json');
var expect = require('chai').expect;

describe('Flight', function(){
    it('should be able to parse date', function(){
        var departing = '28-03-2016 T08:00:00';
        var date = Flight.prototype.parseDate(departing);
        expect(date).to.deep.equal(new Date('Mon, 28 Mar 2016 08:00:00 GMT'));
    });

    it('should be able to format display dates', function(){
        var departing = new Date('2016-03-28T08:00:00');
        var arriving = new Date('Tue, 29 Mar 2016 10:00:00 GMT');

        var dates = Flight.prototype.formatDisplayDates(departing, arriving);
        expect(dates.departing.date).to.equal('Mon, Mar 28, 2016');
        expect(dates.departing.time).to.equal('9:00:00 AM');
        expect(dates.arriving.date).to.equal('Tue, Mar 29, 2016');
        expect(dates.arriving.time).to.equal('11:00:00 AM');
    });
});