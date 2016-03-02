var Itinerary = require('../itinerary.js');
var expect = require('chai').expect;
var moment = require('moment');

describe('Itinerary', function(){

    it('should update checkin and checkout dates', function() {
        var checkin = moment('2016-03-29');
        var checkout = moment('2016-04-11');
        Itinerary.prototype.updateCheckinCheckoutDates(checkin, checkout);
        expect(Itinerary.prototype.checkin).to.equal(checkin);
        expect(Itinerary.prototype.checkout).to.equal(checkout);
    });

    it('should calculate the number of nights given checkin and checkout', function(){
        Itinerary.prototype.checkin = moment('2016-03-29');
        Itinerary.prototype.checkout = moment('2016-04-11');
        var nights = Itinerary.prototype.numberOfNights();
        expect(nights).to.equal(13);
    });

});