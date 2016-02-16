var Mustache = require('mustache');
var moment = require('moment');

var OutboundFlightsView = function(packageOptions){
    this.packageOptions = packageOptions;
    this.element = document.querySelector('#outbound-flights');

    this.onDay = document.querySelector('#outbound-on-day');
    this.nextDay = document.querySelector('#outbound-next-day');
    this.prevDay = document.querySelector('#outbound-prev-day');
};

OutboundFlightsView.prototype = {

    // rebuildOnDayOptions: function(){
    //     var element = this.onDay;
    //     var flights = this.packageOptions.outboundFlights;
    //     this.rebuildFlightOptions(element, flights);
    // },

    rebuildThreeDayFlightOptions: function(){
        var onDay = this.packageOptions.itinerary.outboundDate;
    
        var prevDay =  moment(onDay).subtract(1, 'day');
        var nextDay =  moment(onDay).add(1, 'day');

        var threeDayFlights = this.packageOptions.threeDayFlights;

        console.log('three day flights outbound', threeDayFlights.outboundFlights);
        console.log('my search key', nextDay.toDate());

        // console.log('my search key looks like:', prevDay.toDate());
        // console.log('should have a flight here:', threeDayFlights.outboundFlights[prevDay.toDate()])
        // console.log('all flights', threeDayFlights.outboundFlights);

        // console.log('my search key looks like:', onDay.toDate());
        // console.log('should have a flight here:', threeDayFlights.outboundFlights[onDay.toDate()])
        // console.log('all flights', threeDayFlights.outboundFlights);

        this.rebuildDayFlightOptions(threeDayFlights.outboundFlights[prevDay], this.prevDay, prevDay);
        this.rebuildDayFlightOptions(threeDayFlights.outboundFlights[onDay], this.onDay, onDay);
        this.rebuildDayFlightOptions(threeDayFlights.outboundFlights[nextDay], this.nextDay, nextDay);
        console.log('next day flights', threeDayFlights.outboundFlights[nextDay.toDate()])
    },

    rebuildDayFlightOptions: function(flights, element, day){

        element.innerHTML = '<p>' + day.format('ddd DD MMM') + '</p>';

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
                self.notifyFlightSelectionOnDay(this, day);
            };

            if (flight === this.packageOptions.bestValuePackage.outboundFlight) {
                li.classList.add('best-value');
            }

            if (flight === this.packageOptions.currentPackage.outboundFlight) {
                li.classList.add('selected');
            }

            li.appendChild(a);

            element.appendChild(li);
        }
    },

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

    notifyFlightSelectionOnDay: function(element, day){
        // console.log('element', key);
        // console.log('element id', key.id);
        var key = element.id;
        var flight = this.packageOptions.findOutboundFlightByDayAndKey(day, key);

        this.packageOptions.updateCurrentPackageOutboundFlight(flight);
        this.rebuildThreeDayFlightOptions();

        console.log('current', this.packageOptions.currentPackage);
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