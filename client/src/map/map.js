var Mustache = require('mustache');
//var hotel = require('../packages/view.js')
var testImage =('beach.jpeg');

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
      
      content: Mustache.render('<h2>{{name}} £{{pricePerPerson}}pp</h2><img src="{{address.image}}" class="map-hotel-image"><p class="map-hotel-stars"> {{stars}} stars</p><p class="address">{{address.building}} {{address.street}}, {{address.city}}, {{address.zip}}</p>', hotel),

      maxWidth: 200,
      
      pixelOffset: new google.maps.Size(0,-60)
     }); 

    marker.addListener('click', function(){
      infoWindow.open(this.map, marker);
    });
     // marker.addListener('click', function(){
     //   infoWindow.close();
     // });
    
  },

  openInfoWindowForHotel: function(hotel){

  },

  // google.maps.Map.prototype.markers = new Array();

  // google.maps.Map.prototype.getMarkers = function() {
  //     return this.markers
  // };

  // google.maps.Map.prototype.clearMarkers = function() {
  //     for(var i=0; i<this.markers.length; i++){
  //         this.markers[i].setMap(null);
  //     }
  //     this.markers = new Array();
  // };

  // google.maps.Marker.prototype._setMap = google.maps.Marker.prototype.setMap;

  // google.maps.Marker.prototype.setMap = function(map) {
  //     if (map) {
  //         map.markers[map.markers.length] = this;
  //     }
  //     this._setMap(map);
  // }



}




module.exports = HotelMap;
