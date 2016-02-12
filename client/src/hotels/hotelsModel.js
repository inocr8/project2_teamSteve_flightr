var Hotel = function(params){
  this.name = params.name;
  this.rooms = params.name;
  this.stars = params.stars;
  this.address = {
    building: params.building,
    streets: params.streets,
    city: params.city,
    zip: params.zip
  };
}

module.exports = Hotel;