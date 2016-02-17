var Mustache = require('mustache');
var packageOptions = require('./packagesManager.js');

var PackageRandomizerView = function(packageOptions){
  this.itinerary = packageOptions.itinerary;

  this.outboundFlights = packageOptions.outboundFlights;
  this.returnFlights = packageOptions.returnFlights;

  this.threeDayFlights = packageOptions.threeDayFlights;

  this.hotels = packageOptions.hotels;

}


};