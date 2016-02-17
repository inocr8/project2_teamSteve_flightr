var Mustache = require('mustache');

var PackageSavedView = function(selectedPackages, localStorageManager){
  this.localStorageManager = localStorageManager;

  this.packages = selectedPackages;

  this.element = document.querySelector('#package-saved');

  console.log("Package Saved View Created")
  console.log(this.package);

}

PackageSavedView.prototype = {

  renderEverything: function(){

    var self = this;
    this.packages.forEach(function(package){
      var li = document.createElement('li');
      var button = self.buildDeleteButtonSaved(package);
      li.innerText = package.hotel.name;
      li.appendChild(button);
      self.element.appendChild(li);
    })

  },

  buildDeleteButtonSaved: function(package){
    var button = document.createElement('button');
    button.innerText = 'Delete Saved Package';

    var self = this;
    button.onclick = function(){
      self.localStorageManager.deletePackage(package);
    };
    return button;
  }
};

module.exports = PackageSavedView;