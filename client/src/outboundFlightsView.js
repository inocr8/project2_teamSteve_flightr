var Mustache = require('mustache');

var OutboundFlightsView = function(packageOptions){
    this.packageOptions = packageOptions;
    this.element = document.querySelector('#outbound-flights');
};

OutboundFlightsView.prototype = {

    rebuildFlightOptions: function(){

        this.element.innerHTML = Mustache.render('<p>{{itinerary.departureAirport}} to {{itinerary.arrivalAirport}} - {{itinerary.displayDates.outboundDate}}', this.packageOptions);

        var flights = this.packageOptions.outboundFlights;
        for (var key in flights) {

            var flight = flights[key];

            var li = document.createElement('li');
            li.classList.add('flight-options');

            var a = document.createElement('a');
            a.id = key;
            a.innerHTML = Mustache.render(
                       '<span class="price">£{{price}}pp</span>'
            +           '<span class="time">Dep {{displayDates.departing.time}}</span>'
            +           '<span class="time">Arr {{displayDates.arriving.time}}</span>', flight);

            var self = this;
            a.onclick = function(){
                self.notifyFlightSelection(this);
            };

            if (flight === this.packageOptions.bestValuePackage.outboundFlight) {
                li.classList.add('best-value');
            }

            if (flight === this.packageOptions.currentPackage.outboundFlight) {
                li.classList.add('selected');
            }

            li.appendChild(a);
            this.element.appendChild(li);
        }
    },

    notifyFlightSelection: function(element){
        // console.log('element', key);
        // console.log('element id', key.id);
        var key = element.id;

        this.packageOptions.updateCurrentPackageOutboundFlight(key);
        this.rebuildFlightOptions(this.packageOptions);

        console.log('current', this.packageOptions.currentPackage);
    }
};


module.exports = OutboundFlightsView;