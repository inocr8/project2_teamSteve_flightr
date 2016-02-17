var Mustache = require('mustache');

var PackageView = function(package, localStorageManager){
    this.localStorageManager = localStorageManager;

    this.package = package;
    this.itinerary = package.itinerary;

    // Package Preview
    this.previewButtons = document.querySelector('#package-preview-buttons');
    this.previewOutboundFlight = document.querySelector('#package-preview-outbound-flight');
    this.previewReturnFlight = document.querySelector('#package-preview-return-flight');
    this.previewHotel = document.querySelector('#package-preview-hotel');
    this.previewTotal = document.querySelector('#package-preview-total');

    // Package Summary
    this.summaryOutboundFlight = document.querySelector('#package-summary-outbound-flight');
    this.summaryReturnFlight = document.querySelector('#package-summary-return-flight');
    this.summaryHotel = document.querySelector('#package-summary-hotel');
    this.summaryButtons = document.querySelector('#package-summary-buttons');
    this.summaryTotal = document.querySelector('#package-summary-total');


    console.log('package preview created');

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
    };
};

PackageView.prototype = {
    rebuildPackageView: function(){
        this.previewButtons.innerHTML = '';
        this.summaryButtons.innerHTML = '';

        this.rebuildOutboundFlight();
        this.rebuildReturnFlight();
        this.rebuildHotel();

        this.buildSaveButton();
        this.buildDeleteButton();

        this.rebuildTotal();
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
        this.previewOutboundFlight.innerHTML = '<p>Outbound</p>' + output;
        this.summaryOutboundFlight.innerHTML = '<p>Outbound</p>' + output;

        this.rebuildTotal();
    },

    rebuildReturnFlight: function(){
        var output = this.rebuildFlight(this.package.returnFlight);
        this.previewReturnFlight.innerHTML = '<p>Return</p>' + output;
        this.summaryReturnFlight.innerHTML = '<p>Return</p>' + output;

        this.rebuildTotal();
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
        console.log('package hotel', hotel);

        this.rebuildHotelPreview(view);
        this.rebuildHotelSummary(view);

        this.rebuildTotal();
    },

    rebuildTotal: function(){
        var view = {
            flightsTotal: this.package.calcFlightsTotalPrice(),
            hotelTotal: this.package.calcHotelTotalPrice(),
            totalPerPerson: this.package.calcTotalPrice(),
            total: this.package.calcTotalPricePerPerson()
        };
        var output = Mustache.render(
             '<p>Flights Total: £{{flightsTotal}}</p>'
            +'<p>Hotel Total: £{{hotelTotal}}</p>'
            +'<p>Final Total: £{{total}}', view);

        this.previewTotal.innerHTML = output;
        this.summaryTotal.innerHTML = output;
    },

    // SUMMARY ONLY

    rebuildHotelPreview: function(view){
        var output =  Mustache.render(
            '<div class="package-hotel">'
        +       '<span class="date">{{display.checkin}} - {{display.checkout}}</span>'
        +       '<span class="name">{{hotel.name}}</span>'
        +       '<span class="stars">{{hotel.stars}} {{display.stars}}</span>'
        +       '<span class="price">{{display.numberOfNights}} {{display.nights}} x {{display.numberOfPersons}} {{display.persons}} x £{{hotel.pricePerPerson}}</span'
        +   '</div>', view);

        this.previewHotel.innerHTML = output;
    },

    rebuildHotelSummary: function(view){
        
        var output =  Mustache.render(
            '<div class="package-hotel">'
        +       '<span class="date">{{display.checkin}} - {{display.checkout}}</span>'
        +       '<span class="name">{{hotel.name}}</span>'
        +       '<img src="{{hotel.address.image}}">'
        +       '<span class="stars">{{hotel.stars}} {{display.stars}}</span>'
        +       '<span class="price">{{display.numberOfNights}} {{display.nights}} x {{display.numberOfPersons}} {{display.persons}} x £{{hotel.pricePerPerson}}</span'
        +   '</div>', view);

        this.summaryHotel.innerHTML = output;
    }


    ///// SUMMARY ONLY
};

module.exports = PackageView;
