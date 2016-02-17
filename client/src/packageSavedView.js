var Mustache = require('mustache');

var PackageSavedView = function(savedPackages, localStorageManager){
  this.localStorageManager = localStorageManager;

  this.package = savedPackages[0];
  this.itinerary = savedPackages[0].itinerary;
  
  // Package Saved Summary
  this.outboundFlightElement = document.querySelector('#package-saved-outbound-flight');
  this.returnFlightElement = document.querySelector('#package-saved-return-flight');
  this.packageSavedHotel = document.querySelector('#package-saved-hotel');
  this.packageDeleteButtonSaved = document.querySelector('#package-delete-button')

  console.log("Package Saved View Created")
  console.log(this.package);

}

PackageSavedView.prototype = {

  rebuildPackageSaved: function(){
    this.rebuildOutboundFlight();
    this.rebuildReturnFlight();
    this.rebuildHotel();
    this.buildDeleteButtonSaved();
  },

  buildDeleteButtonSaved: function(){
    var button = document.createElement('button');
    button.innerText = 'Delete Saved Package';

    var self = this;
    button.onclick = function(){
      self.localStorageManager.deletePackage(self.package);
    };
    this.packageDeleteButtonSaved.appendChild(button);
  },

  rebuildOutboundFlight: function(){
    this.outboundFlightElement.innerHTML = this.rebuildFlight(this.package.outboundFlight);
  },

  rebuildReturnFlight: function(){
    this.returnFlightElement.innerHTML = this.rebuildFlight(this.package.returnFlight);
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
        numberOfNights: this.itinerary.numberOfNights,

        checkin: this.itinerary.checkin,
        checkout: this.itinerary.checkout,

        stars: hotel.stars > 1 ? 'stars' : 'star',
        nights: this.itinerary.numberOfNights > 1 ? 'nights' : 'night',
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

    this.packageSavedHotel.innerHTML = output;
  }

};

module.exports = PackageSavedView;