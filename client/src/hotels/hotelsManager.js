var HotelsManager = function(){
  this.data = [];
}

HotelsManager.prototype = {
  addHotel: function(hotel){
    this.data.push(hotel);
  },

  addHotels: function(hotelsArray){
    for (var hotel of hotelsArray) {
      this.addHotel(hotel);
    }
  },

  sortByPriceAsc: function(hotels){
    return hotels.sort(function(a, b){
      return a.pricePerPerson - b.pricePerPerson
    });
  },

  sortByPriceDesc: function(hotels){
    return hotels.sort(function(a, b){
      return b.pricePerPerson - a.pricePerPerson
    });
  },

  sortByStarsAsc: function(hotels){
    return hotels.sort(function(a, b){
      return a.stars - b.stars;
    });
  },

  sortByStarsDesc: function(hotels){
    return hotels.sort(function(a, b){
      return b.stars - a.stars;
    });
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
    return this.sortByPriceAsc(cityHotels);
  },

  filterByStars: function(hotels, stars){
    return hotels.filter(function(hotel){
      console.log(stars, 'include', hotel.stars, '?', stars.includes(hotel.stars));
      return stars.includes(hotel.stars);
    });
  }

};

module.exports = HotelsManager;