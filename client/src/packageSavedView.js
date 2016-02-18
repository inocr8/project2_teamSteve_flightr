var Mustache = require('mustache');
var Itinerary = require('./itinerary/itinerary.js');
var Flight = require('./flights/flight.js');

var PackageSavedView = function(localStorageManager){
  this.localStorageManager = localStorageManager;

  this.packages = this.localStorageManager.packages;

  this.element = document.querySelector('#package-saved');

  this.element.style.display = 'none';

  var holdingText = document.createElement('h2');
  holdingText.style.display = 'block';
  holdingText.innerHTML = 'Click the button above to <b>show saved packages</b>.';
  this.element.appendChild(holdingText);

  console.log("Package Saved View Created")
  console.log(this.package);

  this.savedButton = document.querySelector('#submit-button');

  this.savedButton.onclick = function(){
    console.log('show saved packages button clicked')
    this.rebuildSavedPackages();
    this.element.style.display = 'block';
    holdingText.style.display = 'none';
  }.bind(this);

}

PackageSavedView.prototype = {

  rebuildSavedPackages: function(){
    this.element.innerHTML = '';
    var self = this;
    this.packages.forEach(function(package){
      var li = document.createElement('li');
      li.innerHTML = '<img src="'+package.hotel.address.image+'" width="80" height="80">' + '<h1>'+package.hotel.name+'</h1>';

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
    };
    return button;
  }

};

module.exports = PackageSavedView;