var Hotels = function(){
  this.data = [];
}

Hotels.prototype = {
  addHotel: function(hotel){
    this.data.push(hotel);
  },
  
  sortByCheapest: function(hotels){
    hotels.sort(function(a,b){
      if(a.pricePerPerson > b.pricePerPerson){
        return 1;
      }
      if(a.pricePerPerson < b.pricePerPerson){
        return -1;
      }
    });
  }  



}

module.exports = Hotels;