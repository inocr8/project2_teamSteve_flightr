var View = require('./view.js');

var flightsData = require('./flightsData.json');
var hotelsData = require('./hotelsData.json');

var FlightsManager = require('./flights/flightsManager.js');
var HotelsManager = require('./hotels/hotelsManager.js');
var PackagesManager = require('./packages/packagesManager.js');

var LocalStorageManager = require('./localStorage/localStorageManager.js');
var HotelRandomView = require('./hotelRandomView2.js');

window.onload = function(){

    var flightsManager = new FlightsManager();
    flightsManager.addFlights(flightsData);

    var hotelsManager = new HotelsManager();
    hotelsManager.addHotels(hotelsData);

    var packagesManager = new PackagesManager(flightsManager, hotelsManager);

    var localStorageManager = new LocalStorageManager();

    var view = new View(packagesManager, localStorageManager);

    var hotelRandomView = new HotelRandomView(hotelsManager);
    hotelRandomView.buildRandomHotel();

};