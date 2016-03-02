var expect = require('chai').expect;
var Package = require('../package.js');
var moment = require('moment');

describe('Package', function() {

    beforeEach(function createPackage(){
        itinerary = {
            numberOfPersons: 2,
            departureAirport: 'Edinburgh',
            arrivalAirport: 'Canberra',
            outboundDate: '2016-03-28T08:00:00',
            returnDate: '2016-04-11T11:00:00',
            checkin: '2016-03-29',
            checkout: '2016-04-11',
            numberOfNights: function() {
                return 14;
            }
        };
        outboundFlight = {
            price: 200
        };
        returnFlight = {
            price: 150
        };
        hotel = {
            pricePerPerson: 50
        };
        var options = {
            itinerary: itinerary,
            outboundFlight: outboundFlight,
            returnFlight: returnFlight,
            hotel: hotel
        }
        package = new Package(options);
    });

    it('should calculate the total price per person', function() {
        var price = package.calcTotalPricePerPerson();
        var expectedPrice = 200 + 150 + (50 * 14);
        expect(price).to.equal(expectedPrice);
    });

    it('should calculate the total price', function() {
        var totalPrice = package.calcTotalPrice();
        var expectedPrice = (200 + 150 + (50 * 14)) * 2;
        expect(totalPrice).to.equal(expectedPrice);
    });

    it('should calculate the subtotal of the flights', function() {
        var flightsPrice = package.calcFlightsTotalPrice();
        var expectedPrice = (200 + 150) * 2;
        expect(flightsPrice).to.equal(expectedPrice);
    });

    it('should calculate the subtotal of the hotel', function() {
        var hotelPrice = package.calcHotelTotalPrice();
        var expectedPrice = (50 * 14) * 2;
        expect(hotelPrice).to.equal(expectedPrice);
    });
});