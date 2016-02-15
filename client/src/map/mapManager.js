var Map = function(hotel){
  this.map = new google.maps.Map(document.querySelector("#map"),{
    zoom: 18
  }),
  this.addMarker = function(hotel,title,icon){
    var marker = new google.maps.Marker({
      map: this.map,
      title: title,
      icon: icon
    });
    return marker  
  },
  this.bindClick = function(){
    google.maps.event.addListener
  }

}

module.exports = Map