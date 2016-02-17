var Flight = require('../flight.js');
var outgoingFlightsData = require('./outgoing_flights_test_data.json');
var returnFlightsData = require('./return_flights_test_data.json');
var chai = require('chai');
var expect = require('chai').expect;
var moment = require('moment');
chai.use(require('chai-datetime'));

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
        expect(departing).to.equalDate(new Date('Mon, 28 Mar 2016, 9:00 AM'));
        expect(arriving).to.equalDate(new Date('Tue, 29 Mar 2016, 11:00 AM'));
    });
    it('should be able to calculate flight length', function(){
        var departing = moment(new Date('2016-03-28T08:00:00'));
        var arriving = moment(new Date('Tue, 29 Mar 2016 10:00:00 GMT'));

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
});