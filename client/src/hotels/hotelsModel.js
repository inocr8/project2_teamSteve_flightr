var HotelsModel = function(){
  this.data = [];
}

HotelsModel.prototype = {
  addHotel: function(hotel){
    this.data.push(hotel);
  },
  
  sortDataByPrice: function(hotels){
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

  displayCheapest: function(){
    var cheapest = [];
    cheapest.push(this.data[0]);
    for(var i = 1; i < this.data.length; i++){
      if(this.data[i].pricePerPerson === cheapest[0].pricePerPerson){
        cheapest.push(this.data[i])
      }
    } 
    return cheapest;
  }


};

module.exports = Hotels;