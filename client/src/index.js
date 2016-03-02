var View = require('./views/view.js');
var PackageSavedView = require('./views/packageSavedView.js');

var flightsData = require('./flightsData.json');
var hotelsData = require('./hotelsData.json');

var FlightsManager = require('./flights/flightsManager.js');
var HotelsManager = require('./hotels/hotelsManager.js');
var PackagesManager = require('./packages/packagesManager.js');

var LocalStorageManager = require('./localStorage/localStorageManager.js');
var HotelRandomView = require('./views/hotelRandomView2.js');


window.onload = function(){

    var flightsManager = new FlightsManager();
    flightsManager.addFlights(flightsData);

    var hotelsManager = new HotelsManager();
    hotelsManager.addHotels(hotelsData);

    var packagesManager = new PackagesManager(flightsManager, hotelsManager);

    var localStorageManager = new LocalStorageManager();

    var view = new View(packagesManager, localStorageManager);
    
    var packageSavedView = new PackageSavedView(localStorageManager);

    packageSavedView.displaySavedPackage = function(package){
        view.displaySavedPackage(package);
    };

    localStorageManager.refreshSavedPackages = function(){
        packageSavedView.rebuildSavedPackages();
    };


    var hotelRandomView = new HotelRandomView(hotelsManager);
    hotelRandomView.buildRandomHotel();


    packageSavedView.rebuildSavedPackages();
};


