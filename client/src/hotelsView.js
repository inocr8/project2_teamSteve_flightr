var Mustache = require('mustache');
var HotelMap = require('./map/map.js');

var HotelsView = function(packageOptions){
    this.packageOptions = packageOptions;
    this.hotelMap = new HotelMap(packageOptions.currentPackage.hotel);
    this.element = document.querySelector('#hotels');

    // Sort by

    var self = this;

    self.lowestPriceFirst = document.querySelector('#lowest-price-first');
    self.lowestPriceFirst.onclick = function(e){
        e.preventDefault();
        self.packageOptions.sortHotelsByPriceAsc();
        self.rebuildHotelOptions();
    };

    self.lowestStarsFirst = document.querySelector('#lowest-stars-first');
    self.lowestStarsFirst.onclick = function(e){
        e.preventDefault();
        self.packageOptions.sortHotelsByStarsAsc();
        self.rebuildHotelOptions();
    };

    self.highestStarsFirst = document.querySelector('#highest-stars-first');
    self.highestStarsFirst.onclick = function(e){
        e.preventDefault();
        self.packageOptions.sortHotelsByStarsDesc();
        self.rebuildHotelOptions();
    };
};

HotelsView.prototype = {

    populateMap: function(){
        var hotels = this.packageOptions.hotels;
        for (var key in hotels) {
            var hotel = hotels[key];
            this.hotelMap.addInfoWindow(hotel);
        }
    },

    rebuildHotelOptions: function(){
        this.element.innerHTML = Mustache.render('<p>{{itinerary.destination}} Hotels</p>', this.packageOptions);

        var hotels = this.packageOptions.hotels;
        for (var key in hotels) {

            var hotel = hotels[key];

            var li = document.createElement('li');
            li.classList.add('hotel-options');

            var a = document.createElement('a');
            a.id = key;

            var view = {
                hotel: hotel,
                stars: hotel.stars > 1 ? 'stars' : 'star'
            }

            a.innerHTML = Mustache.render(
                        '<span class="price">£{{hotel.pricePerPerson}}pp</span>'
            +           '<span class="name">{{hotel.name}}</span>'
            +           '<span class="stars">{{hotel.stars}} {{stars}}</span>', view);

            var self = this;
            a.onclick = function(){
                self.notifyHotelSelection(this);
            };

            if (hotel === this.packageOptions.bestValuePackage.hotel) {
                li.classList.add('best-value');
            }

            if (hotel === this.packageOptions.currentPackage.hotel) {
                li.classList.add('selected');
            }

            li.appendChild(a);
            this.element.appendChild(li);
        }
    },

    notifyHotelSelection: function(element){
        var key = element.id;

        var hotel = this.packageOptions.updateCurrentPackageHotel(key);
        this.rebuildHotelOptions(this.packageOptions);
        this.hotelMap.setCenter(hotel);

        console.log('current', this.packageOptions.currentPackage);
    }

};

module.exports = HotelsView;