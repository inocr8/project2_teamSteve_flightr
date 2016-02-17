var Mustache = require('mustache');

var PackageBreakdownView = function(package, localStorageManager){
    this.localStorageManager = localStorageManager;

    this.package = package;
    this.itinerary = package.itinerary;

    // Package Preview
    this.previewButtons = document.querySelector('#package-breakdown-buttons');
    this.outboundFlightElement = document.querySelector('#package-breakdown-outbound-flight');
    this.returnFlightElement = document.querySelector('#package-breakdown-return-flight');
    this.hotelElement = document.querySelector('#package-breakdown-hotel');

    // Package Summary
    this.summaryOutboundFlightElement = document.querySelector('#package-summary-outbound-flight');
    this.summaryReturnFlightElement = document.querySelector('#package-summary-return-flight');
    this.summaryHotel = document.querySelector('#package-summary-hotel');
    this.summaryButtons = document.querySelector('#package-summary-buttons')


    console.log('package breakdown created');

    var self = this;

    this.package.optionsUpdated = function(){
        self.rebuildPackageBreakdown();
    };

    this.package.outboundFlightUpdated = function(){
        self.rebuildOutboundFlight();
    };
    this.package.returnFlightUpdated = function(){
        self.rebuildReturnFlight();
    };
    this.package.hotelUpdated = function(){
        self.rebuildHotel();
    };

    this.itinerary.checkinCheckoutUpdated = function(){
        self.rebuildHotel();
    }
};

PackageBreakdownView.prototype = {
    rebuildPackageBreakdown: function(){
        this.previewButtons.innerHTML = '';
        this.rebuildOutboundFlight();
        this.rebuildReturnFlight();
        this.rebuildHotel();
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
        this.summaryButtons.appendChild(button);
    },

    buildDeleteButton: function(){
        var button = document.createElement('button');
        button.innerText = 'Delete Saved Package';

        var self = this;
        button.onclick = function(){
            self.localStorageManager.deletePackage(self.package);
        };
        this.summaryButtons.appendChild(button);
    },


    rebuildOutboundFlight: function(){
        var output = this.rebuildFlight(this.package.outboundFlight);
        this.outboundFlightElement.innerHTML = output;
        this.summaryOutboundFlightElement.innerHTML = output;
    },

    rebuildReturnFlight: function(){
        var output = this.rebuildFlight(this.package.returnFlight);
        this.returnFlightElement.innerHTML = output;
        this.summaryReturnFlightElement.innerHTML = output;
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

    rebuildHotel: function(){
        var hotel = this.package.hotel;

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
                numberOfNights: this.itinerary.numberOfNights(),

                checkin: this.itinerary.checkin.format('ddd DD MMM'),
                checkout: this.itinerary.checkout.format('ddd DD MMM YYYY'),

                stars: hotel.stars > 1 ? 'stars' : 'star',
                nights: this.itinerary.numberOfNights() > 1 ? 'nights' : 'night',
                persons: this.itinerary.numberOfPersons > 1 ? 'persons' : 'person'
            }
        };

        var output =  Mustache.render(
            '<div class="package-hotel">'
        +       '<span class="date">{{display.checkin}} - {{display.checkout}}</span>'
        +       '<span class="name">{{hotel.name}}</span>'
        +       '<span class="stars">{{hotel.stars}} {{display.stars}}</span>'
        +       '<span class="price">{{display.numberOfNights}} {{display.nights}} x {{display.numberOfPersons}} {{display.persons}} x £{{hotel.pricePerPerson}}</span'
        +   '</div>', view);

        this.hotelElement.innerHTML = output;
        this.summaryHotel.innerHTML = output;
    }
};

module.exports = PackageBreakdownView;
