var Mustache = require('mustache');

var PackageView = function(package){
    this.package = package;
    this.numberOfPersons = package.itinerary.numberOfPersons;
    this.packageBreakdown = document.querySelector('#package-breakdown');

    var self = this;
    this.package.optionsUpdated = function(){
        self.rebuildPackageBreakdown();
    };
};

PackageView.prototype = {
    rebuildPackageBreakdown: function(){
        this.packageBreakdown.innerHTML = '';
        this.packageBreakdown.innerHTML += this.rebuildFlight(this.package.outboundFlight);
        this.packageBreakdown.innerHTML += this.rebuildFlight(this.package.returnFlight);
    },

    rebuildFlight: function(flight){
        return Mustache.render(
            '<div>'
        +       '<span class="date">{{displayDates.departing.date}}</span>'
        +       '<span class="from">{{departure}}</span>'
        +       '<span class="to">to {{arrival}}</span>'
        +       '<span class="time">Dep {{displayDates.departing.time}} - Arr {{displayDates.arriving.time}}</span>'
        +   '</div>', flight);
    }
};

module.exports = PackageView;
