var HotelsManager = function(){
  this.data = [];
}

HotelsManager.prototype = {
  addHotel: function(hotel){
    this.data.push(hotel);
  },
  
  sortByPrice: function(){
    var sortedData = this.data.sort(function(a,b){
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
    this.data = sortedData;
  },  

  hotelsReturnCheapest: function(){
    var cheapest = [this.data[0]];
    for(var i = 1; i < this.data.length; i++){
      if(this.data[i].pricePerPerson === cheapest[0].pricePerPerson){
        cheapest.push(this.data[i])
      }
    } 
    return cheapest;
  },

  hotelsByCity: function(city){
    var cityHotels = [];
    for(hotel of this.data){
      if(hotel.address.city === city){
        cityHotels.push(hotel);
      }
    } 
    return cityHotels;
  }

};

module.exports = HotelsManager;