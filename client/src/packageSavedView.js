var Mustache = require('mustache');
var Itinerary = require('./itinerary/itinerary.js');
var Flight = require('./flights/flight.js');

var PackageSavedView = function(localStorageManager){
  this.localStorageManager = localStorageManager;

  this.packages = this.localStorageManager.packages;

  // this.itinerary = selectedPackage.itinerary;

  this.element = document.querySelector('#package-saved');
  
  // Package Saved Summary
  // this.outboundFlightElement = document.querySelector('#package-saved-outbound-flight');
  // this.returnFlightElement = document.querySelector('#package-saved-return-flight');
  // this.packageSavedHotel = document.querySelector('#package-saved-hotel');
  // this.packageDeleteButtonSaved = document.querySelector('#package-delete-button')

  console.log("Package Saved View Created")
  console.log(this.package);

  this.savedButton = document.querySelector('#submit-button');

  this.savedButton.onclick = function(){
      console.log('show saved packages button clicked')
      this.rebuildSavedPackages();
      this.element.scrollIntoView({block: "end", behavior: "smooth"});
  }.bind(this);

}



PackageSavedView.prototype = {

  rebuildSavedPackages: function(){
    this.element.innerHTML = '';
    var self = this;
    this.packages.forEach(function(package){
      var li = document.createElement('li');
      li.innerText = package.hotel.name;

      var button = self.buildDeleteButtonSaved(package);
      li.appendChild(button);

      var viewButton = self.buildViewPackageButton(package);
      li.appendChild(viewButton);
      self.element.appendChild(li);
    })
  },


  buildDeleteButtonSaved: function(package){
    var button = document.createElement('button');
    button.innerText = 'Delete Saved Package';

    var self = this;
    button.onclick = function(){
      self.localStorageManager.deletePackage(package);
      self.rebuildSavedPackages();
    };
    return button;
  },

  buildViewPackageButton: function(package){
    var button = document.createElement('button');
    button.innerText = 'View Package';
    console.log(this.packagesManager);

    var self = this;
    button.onclick = function(){
      package.itinerary = new Itinerary(package.itinerary);
      package.outboundFlight = new Flight(package.outboundFlight);
      package.returnFlight = new Flight(package.returnFlight);

      self.displaySavedPackage(package);

      // console.log('our package', package);

      // var packageOptions = self.view.packagesManager.createPackageOptions(package.itinerary);
      // packageOptions.setCurrentPackage(package);

      // self.view.renderPackageOptions(packageOptions);
      // self.view.renderPackageView(packageOptions.currentPackage);


      // console.log('package Options',packageOptions);
    };
    return button;
  },


  //////////////////////////////////////
  rebuildPackageSaved: function(){
    this.rebuildOutboundFlight();
    this.rebuildReturnFlight();
    this.rebuildHotel();
    this.buildDeleteButtonSaved();
  },

  rebuildOutboundFlight: function(){
    //var outboundFlight = document.createElement('this.package.outboundFlight');
    this.outboundFlightElement.innerHTML = this.rebuildFlight(this.package.outboundFlight);
    // this.outboundFlightElement.appendChild(outboundFlight);
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

        // checkin: this.itinerary.checkin,
        // checkout: this.itinerary.checkout,

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