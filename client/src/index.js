var View = require('./view.js');

var flightsData = require('./flightsData.json');
var hotelsData = require('./hotelsData.json');

var FlightsManager = require('./flights/flightsManager.js');
var HotelsManager = require('./hotels/hotelsManager.js');
var PackagesManager = require('./packages/packagesManager.js');

window.onload = function(){

    var flightsManager = new FlightsManager();
    flightsManager.addFlights(flightsData);

    var hotelsManager = new HotelsManager();

    hotelsData.forEach(function(hotel){
        hotelsManager.addHotel(hotel);
    });

    console.log('data', hotelsManager.data);

    var packagesManager = new PackagesManager(flightsManager, hotelsManager);

    var view = new View(packagesManager);

    

};