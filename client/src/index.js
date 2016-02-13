var View = require('./view.js');

var flightsData = require('./flightsData.json');

var FlightsManager = require('./flights/flightsManager.js');
var PackagesManager = require('./packages/packagesManager.js');

window.onload = function(){

    var flightsManager = new FlightsManager();
    flightsManager.addFlights(flightsData);

    var packagesManager = new PackagesManager(flightsManager);

    var view = new View(packagesManager);
};