var Mustache = require('mustache');
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
      title: markerTitle
      // icon: icon
    });
    return marker;
  },

  setCenter: function(hotel){
    var hotelLatLng = hotel.address.latLng;
    this.map.setCenter(hotelLatLng);
  },

  addMarkerListener: function(marker){
    marker.onmouseover = function(){
      this.map.setCenter(marker.position);
    }
  },

   addInfoWindow: function(hotel){
     var marker = this.addMarker(hotel);
     var infoWindow = new google.maps.InfoWindow({
      content: Mustache.render("Hotel Name: {{name}}, Stars: {{stars}}, Price Per Person: {{pricePerPerson}}", hotel)
     });
    marker.addListener('mouseover', function(){
      infoWindow.open(this.map, marker);
    });
    marker.addListener('mouseout', function(){
      infoWindow.close();
    });
    
  }
}




module.exports = HotelMap;
