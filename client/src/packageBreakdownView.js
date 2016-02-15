var Mustache = require('mustache');

var PackageBreakdownView = function(package, localStorageManager){
    this.localStorageManager = localStorageManager;
    this.package = package;
    this.numberOfPersons = package.itinerary.numberOfPersons;
    this.packageBreakdown = document.querySelector('#package-breakdown');

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

        this.buildSaveButton();
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

    rebuildFlight: function(flight){
        var view = {
            flight: flight,
            numberOfPersons: this.numberOfPersons
        };

        return Mustache.render(
            '<div class="package-flight">'
        +       '<span class="date">{{flight.displayDates.departing.date}}</span>'
        +       '<span class="from">{{flight.departure}}</span>'
        +       '<span class="to">to {{flight.arrival}}</span>'
        +       '<span class="time">Dep {{flight.displayDates.departing.time}} - Arr {{flight.displayDates.arriving.time}}</span>'
        +       '<span class="price">{{numberOfPersons}} x £{{flight.price}}</span'
        +   '</div>', view);
    }
};

module.exports = PackageBreakdownView;
