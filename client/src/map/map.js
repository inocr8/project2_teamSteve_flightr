//var hotel = require('../packages/view.js')

var HotelMap = function(hotel){
  var hotelLatLng = hotel.address.latLng; 
  var markerTitle = hotel.name;
  this.map = new google.maps.Map(document.querySelector('#map'),{
    centre: hotelLatLng,
    zoom: 8 
  }),
  this.addMarker = function(hotelLatLng,markerTitle,icon){
    var marker = new google.maps.Marker({
      position: hotelLatLng,
      map: this.map,
      title: markerTitle,
      icon: icon
    });
    return marker
  }

  };  

module.exports = HotelMap;
