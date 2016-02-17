var Mustache = require('mustache');
var HotelsManager = require('./hotelsManager');

var HotelRandomView = function(HotelsManager){
  this.randomHotel = hotelsManager.hotelsReturnRandom();
  self = this;
}

HotelRandomView.prototype = {
  rebuildHotelRandomView: function(){
    this.rebuildHotel();
  }




}



};


module.exports = HotelRandomView;