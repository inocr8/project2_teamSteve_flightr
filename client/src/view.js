var Itinerary = require('./itinerary/itinerary.js');
var PackageView = require('./packageView.js');
var PackageSavedView = require('./packageSavedView.js');
var OutboundFlightsView = require('./outboundFlightsView.js');
var ReturnFlightsView = require('./returnFlightsView.js');
var HotelsView = require('./hotelsView.js');

var View = function(packagesManager, localStorageManager){
    this.packagesManager = packagesManager;
    this.localStorageManager = localStorageManager;

    // Form
    this.departureAirport = document.querySelector('#departure-airport');
    this.arrivalAirport = document.querySelector('#arrival-airport');

    this.outboundDate = document.querySelector('#outbound-date');
    this.returnDate = document.querySelector('#return-date');

    this.numberOfPersons = document.querySelector('#number-of-persons');

    this.searchButton = document.querySelector('#search-button');

    // Views
    this.hotel = document.querySelector('#hotel');
    //this.randomHotel = document.querySelector('#hotel-random');
    this.packagePreview = document.querySelector('#package-preview');
    this.packageSummary = document.querySelector('#package-summary');
    this.packageSaved = document.querySelector('#package-saved');

    this.searchButton.onclick = function(){

        var itinerary = new Itinerary({
            numberOfPersons: this.numberOfPersons.value,

            departureAirport: this.departureAirport.value,
            arrivalAirport: this.arrivalAirport.value,

            outboundDate: this.outboundDate.value,
            returnDate: this.returnDate.value
        });

        var packageOptions = this.packagesManager.createPackageOptions(itinerary);

        this.renderPackageOptions(packageOptions);
        this.renderPackageView(packageOptions.currentPackage);

        this.packagePreview.scrollIntoView({block: "end", behavior: "smooth"});

    }.bind(this);

    // var savedPackages = this.localStorageManager.getPackages('savedPackageData');
    // console.log(savedPackages);
        // console.log(savedPackages[0]);

};

    View.prototype = {


    displaySavedPackage: function(package){
        document.querySelector('#tab3').checked = true;
        
        var packageOptions = this.packagesManager.createPackageOptions(package.itinerary);
        packageOptions.setCurrentPackage(package);

        this.renderPackageOptions(packageOptions);
        this.renderPackageView(packageOptions.currentPackage);
        this.packagePreview.scrollIntoView({block: "end", behavior: "smooth"});
    },


    renderPackageOptions: function(packageOptions){

        var outboundFlightsView = new OutboundFlightsView(packageOptions);
        var returnFlightsView = new ReturnFlightsView(packageOptions);
        var hotelsView = new HotelsView(packageOptions);

        // outboundFlightsView.rebuildFlightOptions();
        outboundFlightsView.rebuildThreeDayFlightOptions();
        returnFlightsView.rebuildThreeDayFlightOptions();
        hotelsView.rebuildHotelOptions();

        hotelsView.rebuildFilters();
        hotelsView.populateMap();
    },


    renderPackageView: function(package){
        var packageView = new PackageView(package, this.localStorageManager);
        packageView.rebuildPackageView();
    },

    // renderSavedPackageBreakdown: function(){

    //     // var savedPackagesView = document.querySelector("package-saved");
    //     var packageSavedView = new PackageSavedView(this, this.localStorageManager);
    //     packageSavedView.rebuildSavedPackages();
    // }




};

module.exports = View;