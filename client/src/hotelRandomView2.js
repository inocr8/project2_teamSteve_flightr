var Mustache = require('mustache');
//var HotelsManager = require('./hotels/hotelsManager.js');

var HotelRandomView = function(hotelsManager){
  this.randomHotel = hotelsManager.hotelsReturnRandom();
  this.element = document.querySelector('#hotel-random');
}

HotelRandomView.prototype = {
  buildRandomHotel: function(){
    var output = Mustache.render(
        '<div class="hotel-info">Hotel Name: {{name}}, Stars: {{stars}}, Price Per Person: £{{pricePerPerson}}, Address: {{address.building}} {{address.street}} {{address.city}},{{address.zip}}</div><img src="{{address.image}}"/>'
        , this.randomHotel);
    this.element.innerHTML = output;
  }

};


module.exports = HotelRandomView;