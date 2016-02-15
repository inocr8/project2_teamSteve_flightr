var _ = require('lodash');

var LocalStorageManager = function(){

    this.storageKeyPackages ="flightrPackages";
    this.storageKeyItineraries ="flightrItineraries";

    this.packages = this.getPackages() || [];
    this.itineraries = this.getItineraries() || [];
};

LocalStorageManager.prototype = {

  getPackages:function(){
    var packagesString = localStorage.getItem(this.storageKeyPackages);
    if(!packagesString) return;
    return JSON.parse(packagesString);
  },

  savePackage:function(package){
    var storedPackages = this.packages;
    for ( var i = 0; i < storedPackages.length; i++ ) {
      if ( _.isEqual(storedPackages[i], package ) ){
        console.log('Already saved');
        return;
      }
    }
    storedPackages.push(package);
    localStorage.setItem(this.storageKeyPackages, JSON.stringify(storedPackages));
  },

  deletePackage:function(package){
    var storedPackages = this.packages;
    for ( var i = 0; i < storedPackages.length; i++ ) {
      if ( _.isEqual(storedPackages[i], package ) ){
        storedPackages.splice(i,1); 
      }
    }
    localStorage.setItem(this.storageKeyPackages, JSON.stringify(storedPackages));
  },

  getItineraries:function(){
    var itinerariesString = localStorage.getItem(this.storageKeyitineraries);
    if(!itinerariesString) return;
    return JSON.parse(itinerariesString);
  },

  saveItinerary:function(itinerary){
    var storedItineraries = this.itineraries;
    for ( var i = 0; i < storedItineraries.length; i++ ) {
      if ( _.isEqual(storedItineraries[i], itinerary ) ){
        console.log('Already saved');
        return;
      }
    }
    storedItineraries.push(itinerary);
    localStorage.setItem(this.storageKeyItineraries, JSON.stringify(storedItineraries));
  },

  deleteItinerary:function(itinerary){
    var storedItineraries = this.itineraries;
    for ( var i = 0; i < storedItineraries.length; i++ ) {
      if ( _.isEqual(storedItineraries[i], itinerary ) ){
        storedItineraries.splice(i,1); 
      }
    }
    localStorage.setItem(this.storageKeyItineraries, JSON.stringify(storedItineraries));
  },
};

module.exports = LocalStorageManager;