var Mustache = require('mustache');

var PackageBreakdownView = function(package, localStorageManager){
    this.localStorageManager = localStorageManager;
    this.package = package;
    this.itinerary = package.itinerary;
    this.packageBreakdown = document.querySelector('#package-breakdown');
    console.log('package breakdown created');

    var self = this;
    this.package.optionsUpdated = function(){
        self.rebuildPackageBreakdown();
    };
};

PackageBreakdownView.prototype = {
    rebuildPackageBreakdown: function(){
        this.packageBreakdown.innerHTML = '';
        this.packageBreakdown.innerHTML += this.rebuildFlight(this.package.outboundFlight);
        this.packageBreakdown.innerHTML += this.rebuildFlight(this.package.returnFlight);
        this.packageBreakdown.innerHTML += this.rebuildHotel(this.package.hotel);
        this.buildSaveButton();
        this.buildDeleteButton();
    },

    buildSaveButton: function(){
        var button = document.createElement('button');
        button.innerText = 'Save Package';

        var self = this;
        button.onclick = function(){
            self.localStorageManager.savePackage(self.package);
        };
        this.packageBreakdown.appendChild(button);
    },

    buildDeleteButton: function(){
        var button = document.createElement('button');
        button.innerText = 'Delete Saved Package';

        var self = this;
        button.onclick = function(){
            self.localStorageManager.deletePackage(self.package);
        };
        this.packageBreakdown.appendChild(button);
    },

    rebuildFlight: function(flight){
        var view = {
            flight: flight,
            numberOfPersons: this.itinerary.numberOfPersons
        };

        return Mustache.render(
            '<div class="package-flight">'
        +       '<span class="date">{{flight.displayDates.departing.date}}</span>'
        +       '<span class="from">{{flight.departure}}</span>'
        +       '<span class="to">to {{flight.arrival}}</span>'
        +       '<span class="time">Dep {{flight.displayDates.departing.time}} - Arr {{flight.displayDates.arriving.time}}</span>'
        +       '<span class="price">{{numberOfPersons}} x £{{flight.price}}</span'
        +   '</div>', view);
    },

    rebuildHotel: function(hotel){
        var dateOptions = {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };

        var view = {
            hotel: hotel,

            display: {
                numberOfPersons: this.itinerary.numberOfPersons,
                numberOfNights: this.itinerary.numberOfNights,

                checkin: this.itinerary.checkin.toLocaleDateString('en-GB', dateOptions),
                checkout: this.itinerary.checkout.toLocaleDateString('en-GB', dateOptions),

                stars: hotel.stars > 1 ? 'stars' : 'star',
                nights: this.itinerary.numberOfNights > 1 ? 'nights' : 'night',
                persons: this.itinerary.numberOfPersons > 1 ? 'persons' : 'person'
            }
        };

        return Mustache.render(
            '<div class="package-hotel">'
        +       '<span class="date">{{display.checkin}} - {{display.checkout}}</span>'
        +       '<span class="name">{{hotel.name}}</span>'
        +       '<span class="stars">{{hotel.stars}} {{display.stars}}</span>'
        +       '<span class="price">{{display.numberOfNights}} {{display.nights}} x {{display.numberOfPersons}} {{display.persons}} x £{{hotel.pricePerPerson}}</span'
        +   '</div>', view);
    }
};

module.exports = PackageBreakdownView;
