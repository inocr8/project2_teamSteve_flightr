var Itinerary = require('./itinerary/itinerary.js');

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

        this.outboundFlight.innerHTML
        =   '<p>Departing: ' + package.outboundFlight.departure + ' ' + package.outboundFlight.departing + '</p>'
        +   '<p>Arriving: ' + package.outboundFlight.arrival + ' ' + package.outboundFlight.arriving + '</p>'
        +   '<p>Price: ' + package.outboundFlight.price + '</p>'

        this.returnFlight.innerHTML
        =   '<p>Departing: ' + package.returnFlight.departure + ' ' + package.returnFlight.departing + '</p>'
        +   '<p>Arriving: ' + package.returnFlight.arrival + ' ' + package.returnFlight.arriving + '</p>'
        +   '<p>Price: ' + package.returnFlight.price + '</p>';

        this.hotel.innerHTML
        =   '<p>' + package.hotel.name + ', ' + package.hotel.stars + ' star(s)</p>'
        +   '<p>Price Per Person: ' + package.hotel.pricePerPerson + '</p>';

        this.packageBreakdown.innerHTML
        =   '<p>Total: ' + package.totalPrice() + '</p>';
    }
};

module.exports = View;