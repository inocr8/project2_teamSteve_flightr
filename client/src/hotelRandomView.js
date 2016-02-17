var Mustache = require('mustache');
var HotelsManager = require('./hotelsManager');

var HotelRandomView = function(HotelsManager){
  this.randomHotel = hotelsManager.hotelsReturnRandom();
  this.element = document.querySelector('#hotel-random');
}

HotelRandomView.prototype = {
  buildRandomHotel: function(){
    element.innerHTML = Mustache.render(
      '<ul><li>{{name}}</li> <li>{{pricePerPerson}}</li> <li>{{stars}}</li></ul>'
      
      )
  }
};


module.exports = HotelRandomView;