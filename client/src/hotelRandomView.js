var Mustache = require('mustache');
var HotelsManager = require('./hotelsManager');

var HotelRandomView = function(HotelsManager){
  this.randomHotel = hotelsManager.hotelsReturnRandom();
  this.element = document.querySelector('#hotel-random');
}

HotelRandomView.prototype = {
  buildRandomHotel: function(){
    element.innerHTML = Mustache.render(
      'Hotel Name: {{name}}, Stars: {{stars}}, Price Per Person: £{{pricePerPerson}}, <div>Address: {{address.building}} {{address.street}} {{address.city}},{{address.zip}}</div>,<img src="{{address.image}}"/>'
      )
  }
};


module.exports = HotelRandomView;