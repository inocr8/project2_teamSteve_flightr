var HotelsManager = function(){
  this.data = [];
}

HotelsManager.prototype = {
  addHotel: function(hotel){
    this.data.push(hotel);
  },
  
  sortByPrice: function(hotels){
    var sortedData = hotels.sort(function(a,b){
      if (a.pricePerPerson > b.pricePerPerson) {
    return 1;
    }
    if (a.pricePerPerson < b.pricePerPerson) {
      return -1;
    }
    if (a.pricePerPerson === b.pricePerPerson){
    return 0;
    }
    });
    return sortedData;
  },  

  hotelsReturnCheapest: function(){
    var cheapest = [];
    cheapest.push(this.data[0]);
    for(var i = 1; i < this.data.length; i++){
      if(this.data[i].pricePerPerson === cheapest[0].pricePerPerson){
        cheapest.push(this.data[i])
      }
    } 
    return cheapest;
  },

  hotelsByCity: function(city){
    var cities = [];
    for(hotel of this.data){
      if(hotel.city === city){
        cities.push(hotel);
      }
    } 
    return cities;
  }



};

module.exports = HotelsManager;