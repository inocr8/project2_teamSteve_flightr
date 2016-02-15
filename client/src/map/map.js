//var hotel = require('../packages/view.js')

var HotelMap = function(hotel){
  var hotelLatLng = hotel.address.latLng; 
  var markerTitle = hotel.name;
  this.map = new google.maps.Map(document.querySelector('#map'),{
    center: hotelLatLng,
    zoom: 14 
  });
};

HotelMap.prototype = {
  addMarker: function(hotel){
    var hotelLatLng = hotel.address.latLng; 
    var markerTitle = hotel.name;
    var marker = new google.maps.Marker({
      position: hotelLatLng,
      map: this.map,
      title: markerTitle,
      // icon: icon
    });
    return marker
  },
  setCenter: function(hotel){
    var hotelLatLng = hotel.address.latLng;
    this.map.setCenter(hotelLatLng);
  }


};

module.exports = HotelMap;
