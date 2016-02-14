var Itinerary = require('./itinerary/itinerary.js');
var Mustache = require('mustache');

var View = function(packagesManager){
    var self = this;

    self.packagesManager = packagesManager;

    // Form
    self.departureAirport = document.querySelector('#departure-airport');
    self.arrivalAirport = document.querySelector('#arrival-airport');

    self.outboundDate = document.querySelector('#outbound-date');
    self.returnDate = document.querySelector('#return-date');

    self.numberOfPersons = document.querySelector('#number-of-persons');

    self.searchButton = document.querySelector('#search-button');

    // Views
    self.outboundFlight = document.querySelector('#outbound-flight');
    self.returnFlight = document.querySelector('#return-flight');
    self.hotel = document.querySelector('#hotel')

    self.packageBreakdown = document.querySelector('#package-breakdown');

    self.searchButton.onclick = function(){

        var itinerary = new Itinerary({
            numberOfPersons: self.numberOfPersons.value,

            departureAirport: self.departureAirport.value,
            arrivalAirport: self.arrivalAirport.value,

            outboundDate: new Date(self.outboundDate.value),
            returnDate: new Date(self.returnDate.value)
        });

        var packageOptions = self.packagesManager.createPackageOptions(itinerary);
        var bestValuePackage = self.packagesManager.bestValuePackage(packageOptions);
        self.renderPackage(bestValuePackage);
    };
};

View.prototype = {

    renderPackage: function(package){

        var dateOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };

        var display = {

        };

        this.outboundFlight.innerHTML = Mustache.render('<p>Departing: {{outboundFlight.departure}} {{dates.outboundFlight.departing}}</p><p>Arriving: {{outboundFlight.arrival}} {{dates.outboundFlight.arriving}}</p><p>Price: {{outboundFlight.price}}</p>', package);

        // this.outboundFlight.innerHTML
        // =   '<p>Departing: ' + package.outboundFlight.departure + ' ' + package.outboundFlight.departing.toLocaleDateString('en-GB', dateOptions) + '</p>'
        // +   '<p>Arriving: ' + package.outboundFlight.arrival + ' ' + package.outboundFlight.arriving + '</p>'
        // +   '<p>Price: ' + package.outboundFlight.price + '</p>';

        this.returnFlight.innerHTML
        =   Mustache.render('<p>Departing: {{returnFlight.departure}} {{dates.returnFlight.departing}}</p><p>Arriving: {{returnFlight.arrival}} {{dates.returnFlight.arriving}}</p><p>Price: {{returnFlight.price}}</p>', package);

        this.hotel.innerHTML
        =   Mustache.render('<p>{{hotel.name}}, {{hotel.stars}} star(s)</p>'
        +   '<p>Price Per Person: {{hotel.pricePerPerson}}</p>', package);

        this.packageBreakdown.innerHTML
        =   Mustache.render('<p>Price Per Person: {{totalPricePerPerson}}</p>'
        +   '<p>Number of Persons: {{itinerary.numberOfPersons}}</p>'
        +   '<p>Total Price: {{totalPrice}}</p>', package);
    }
};

module.exports = View;