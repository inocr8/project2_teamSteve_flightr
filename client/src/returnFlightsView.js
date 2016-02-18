var Mustache = require('mustache');
var moment = require('moment');

var ReturnFlightsView = function(packageOptions){
    this.packageOptions = packageOptions;
    this.element = document.querySelector('#return-flights');

    this.onDay = document.querySelector('#return-on-day');
    this.nextDay = document.querySelector('#return-next-day');
    this.prevDay = document.querySelector('#return-prev-day');
};

ReturnFlightsView.prototype = {

    rebuildThreeDayFlightOptions: function(){
        var onDay = this.packageOptions.itinerary.returnDate;
    
        var prevDay =  moment(onDay).subtract(1, 'day');
        var nextDay =  moment(onDay).add(1, 'day');

        var threeDayFlights = this.packageOptions.threeDayFlights;

        this.rebuildDayFlightOptions(threeDayFlights.returnFlights[prevDay], this.prevDay, prevDay);
        this.rebuildDayFlightOptions(threeDayFlights.returnFlights[onDay], this.onDay, onDay);
        this.rebuildDayFlightOptions(threeDayFlights.returnFlights[nextDay], this.nextDay, nextDay);
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
                       '<span class="price">£{{price}}<span class="pp">pp</span></span>'
            +           '<span class="time">Dep {{displayDates.departing.time}}</span>'
            +           '<span class="time">Arr {{displayDates.arriving.time}}</span>'
            +           '<span class="date">on {{displayDates.arriving.date}}</span>'
            +           '<span class="length">Transit {{displayDates.length}}</span>', flight);

            var self = this;
            a.onclick = function(){
                self.notifyFlightSelectionOnDay(day, this.id);
            };

            if (flight === this.packageOptions.bestValuePackage.returnFlight) {
                li.classList.add('best-value');
            }

            if (flight === this.packageOptions.currentPackage.returnFlight) {
                li.classList.add('selected');
            }

            li.appendChild(a);

            element.appendChild(li);
        }
    },

    notifyFlightSelectionOnDay: function(day, key){

        var flight = this.packageOptions.findReturnFlightByDayAndKey(day, key);

        this.packageOptions.updateCurrentPackageReturnFlight(flight);
        this.rebuildThreeDayFlightOptions();
    }
};


module.exports = ReturnFlightsView;