var Mustache = require('mustache');
//var HotelsManager = require('./hotels/hotelsManager.js');

var HotelRandomView = function(hotelsManager){
  this.randomHotel = hotelsManager.hotelsReturnRandom();
  this.element = document.querySelector('#hotel-random');
}

HotelRandomView.prototype = {
  buildRandomHotel: function(){
    var output = Mustache.render(
        '<div class="hotel-info">'+'<h2>'+'{{name}}'+'</h2>'+'<h3>'+'Stars: {{stars}}'+'</h3>'+'<h4>'+'Price Per Person: £{{pricePerPerson}}'+'<br>'+'Address: {{address.building}} {{address.street}} {{address.city}},{{address.zip}}'+'</h4>'+'</div><img src="{{address.image}}" style="float:right"/>'
        , this.randomHotel);
    this.element.innerHTML = output;
  }

};


module.exports = HotelRandomView;