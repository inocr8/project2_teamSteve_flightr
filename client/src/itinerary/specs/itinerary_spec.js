var Itinerary = require('../itinerary.js');
var expect = require('chai').expect;

describe('Itinerary', function(){

    it('should calculate the number of nights given checkin and checkout', function(){
        var checkin = new Date('2016-03-29');
        console.log(checkin);
        var checkout = new Date('2016-04-11');
        var nights = Itinerary.prototype.calcNumberOfNights(checkin, checkout);
        expect(nights).to.equal(13);
    });
});