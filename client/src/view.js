var Itinerary = require('./itinerary/itinerary.js');
var PackageView = require('./packageView.js');
var OutboundFlightsView = require('./outboundFlightsView.js');
var ReturnFlightsView = require('./returnFlightsView.js');
var HotelsView = require('./hotelsView.js');

var View = function(packagesManager, localStorageManager){
    this.packagesManager = packagesManager;
    this.localStorageManager = localStorageManager;

    // Form
    this.departureAirport = document.querySelector('#departure-airport');
    this.arrivalAirport = document.querySelector('#arrival-airport');

    this.outboundDate = document.querySelector('#outbound-date');
    this.returnDate = document.querySelector('#return-date');

    this.numberOfPersons = document.querySelector('#number-of-persons');

    this.searchButton = document.querySelector('#search-button');

    // Views
    this.hotel = document.querySelector('#hotel');
    this.randomHotel = document.querySelector('#hotel-random');
    this.packageBreakdown = document.querySelector('#package-breakdown');
    this.packageSummary = document.querySelector('#package-summary');

    // Prevent Tabs from defaulting
    // var tabs = document.querySelectorAll('input[type=radio]');
    // for (var i = 0; i < tabs.length; i++) {
    //     tabs[i].addEventListener('click', function(e){
    //         e.preventDefault();
    //     });
    // }

    this.searchButton.onclick = function(){


        // var itinerary = this.createItinerary();
        // var flights = this.flightsManager.returnJourneyQuery(itinerary);

        // itinerary.checkin = flights.outboundFlights[0].arriving;
        // itinerary.checkout = flights.returnFlights[0].departing;
        
        // console.log('destination', itinerary.destination);
        // var packageOptions = this.createPackageOptions(itinerary);


        //////////////////////////////////////

        var itinerary = new Itinerary({
            numberOfPersons: this.numberOfPersons.value,

            departureAirport: this.departureAirport.value,
            arrivalAirport: this.arrivalAirport.value,

            outboundDate: this.outboundDate.value,
            returnDate: this.returnDate.value
        });
        var packageOptions = this.packagesManager.createPackageOptions(itinerary);

        this.renderPackageOptions(packageOptions);
        this.renderPackageView(packageOptions.currentPackage);

    }.bind(this);
};

View.prototype = {

    // renderPackage: function(package){

    //     var dateOptions = {
    //         year: 'numeric',
    //         month: 'short',
    //         day: 'numeric'
    //     };

    //     var display = {

    //     };

    //     this.outboundFlights.innerHTML = Mustache.render(
    //         '<p>Dep: {{outboundFlight.departure}} {{displayDates.outboundFlight.departing}}</p>'
    //         +'<p>Arr: {{outboundFlight.arrival}} {{outboundFlight.dates.arriving}}</p>'
    //         +'<p>£{{outboundFlight.price}}pp</p>', package);

    //     // this.outboundFlight.innerHTML
    //     // =   '<p>Departing: ' + package.outboundFlight.departure + ' ' + package.outboundFlight.departing.toLocaleDateString('en-GB', dateOptions) + '</p>'
    //     // +   '<p>Arriving: ' + package.outboundFlight.arrival + ' ' + package.outboundFlight.arriving + '</p>'
    //     // +   '<p>Price: ' + package.outboundFlight.price + '</p>';

    //     this.returnFlights.innerHTML
    //     =   Mustache.render('<p>Departing: {{returnFlight.departure}} {{dates.returnFlight.departing}}</p><p>Arriving: {{returnFlight.arrival}} {{dates.returnFlight.arriving}}</p><p>Price: {{returnFlight.price}}</p>', package);

    //     this.hotel.innerHTML
    //     =   Mustache.render('<p>{{hotel.name}}, {{hotel.stars}} star(s)</p>'
    //     +   '<p>Price Per Person: {{hotel.pricePerPerson}}</p>', package);

    //     this.packageBreakdown.innerHTML
    //     =   Mustache.render('<p>Price Per Person: {{totalPricePerPerson}}</p>'
    //     +   '<p>Number of Persons: {{itinerary.numberOfPersons}}</p>'
    //     +   '<p>Total Price: {{totalPrice}}</p>', package);
    // },

    // createItinerary: function(){
    //     return new Itinerary({
    //         numberOfPersons: this.numberOfPersons.value,

    //         departureAirport: this.departureAirport.value,
    //         arrivalAirport: this.arrivalAirport.value,

    //         outboundDate: new Date(this.outboundDate.value),
    //         returnDate: new Date(this.returnDate.value)
    //     });
    // }

    // createPackageOptions: function(itinerary){

    //     var flights = this.flightsManager.returnJourneyQuery(itinerary);

    //     itinerary.checkin = flights.outboundFlights[0].arriving;
    //     itinerary.checkout = flights.returnFlights[0].departing;
    //     console.log('destination', itinerary.destination);

    //     var hotels = this.hotelsManager.hotelsByCity(itinerary.destination);
    //     console.log('hotels', hotels);
    //     var hotels = this.hotelsManager.sortByPrice(hotels);

    //     var options = {
    //         itinerary: itinerary,
    //         outboundFlights: flights.outboundFlights,
    //         returnFlights: flights.returnFlights,
    //         hotels: hotels,
    //     };

    //     var packageOptions = new PackageOptions(options);
    //     this.packageOptions = packageOptions;

    //     // console.log('packages', packages);

    //     return packageOptions;
    // },


    renderPackageOptions: function(packageOptions){

        var outboundFlightsView = new OutboundFlightsView(packageOptions);
        var returnFlightsView = new ReturnFlightsView(packageOptions);
        var hotelsView = new HotelsView(packageOptions);

        // outboundFlightsView.rebuildFlightOptions();
        outboundFlightsView.rebuildThreeDayFlightOptions();
        returnFlightsView.rebuildThreeDayFlightOptions();
        hotelsView.rebuildHotelOptions();
        hotelsView.populateMap();
    },

    renderPackageView: function(package){
        var packageView = new PackageView(package, this.localStorageManager);
        packageView.rebuildPackageView();
    }

};

module.exports = View;