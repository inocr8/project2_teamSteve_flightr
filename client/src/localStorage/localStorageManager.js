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
    this.packages.push(package);
    localStorage.setItem(this.storageKeyPackages, JSON.stringify(this.packages));
  },

  getItineraries:function(){
    var itinerariesString = localStorage.getItem(this.storageKeyitineraries);
    if(!itinerariesString) return;
    return JSON.parse(itinerariesString);
  },

  saveItinerary:function(itinerary){
    this.itineraries.push(itinerary);
    localStorage.setItem(this.storageKeyItineraries, JSON.stringify(this.itineraries));
  },
};

module.exports = LocalStorageManager;