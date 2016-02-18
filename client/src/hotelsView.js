var Mustache = require('mustache');
var HotelMap = require('./map/map.js');
var HotelsManager = require('./hotels/hotelsManager.js');

var HotelsView = function(packageOptions){
    this.packageOptions = packageOptions;
    this.hotelMap = new HotelMap(packageOptions.currentPackage.hotel);
    this.element = document.querySelector('#hotels');

    this.averageHotelPrice = document.querySelector('#average-hotel-price');

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

    //Filter
    this.filterByStarsForm = document.querySelector('#filter-by-stars');
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

        this.element.innerHTML = '';
        // this.element.innerHTML = Mustache.render('<p>{{itinerary.destination}} Hotels</p>', this.packageOptions);

        var hotels = this.packageOptions.displayingHotels;
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
                        '<span class="name">{{hotel.name}}</span><span class="price">£{{hotel.pricePerPerson}}pp</span><span class="stars">{{hotel.stars}} {{stars}}</span>', view);

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

        this.rebuildAverageHotelPrice(hotels);
    },

    rebuildAverageHotelPrice: function(hotels){
        this.averageHotelPrice.innerHTML = HotelsManager.prototype.averagePricePerPerson(hotels);
    },

    notifyHotelSelection: function(element){
        var key = element.id;

        var hotel = this.packageOptions.updateCurrentPackageHotel(key);
        this.rebuildHotelOptions(this.packageOptions);
        this.hotelMap.setCenter(hotel);

        console.log('current', this.packageOptions.currentPackage);
    },

    rebuildFilters: function(){
        this.filterByStarsForm.innerHTML = 'Filter By Stars:  ';
        for (var stars = 5; stars >= 1; stars--) {
            var label = document.createElement('label');
            label.innerHTML = stars;
            label.htmlFor = stars;
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'stars';
            checkbox.id = stars;
            checkbox.value = stars;


            var self = this;
            checkbox.onclick = function(){

                var checkboxes = self.filterByStarsForm.stars;

                var stars = [];
                for (var i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked)
                        stars.push(parseInt(checkboxes[i].value));
                }

                if (stars[0] == null) {
                    stars = [1,2,3,4,5];
                }

                self.packageOptions.filterHotelsByStars(stars);
                self.rebuildHotelOptions();
            };
            this.filterByStarsForm.appendChild(label);
            this.filterByStarsForm.appendChild(checkbox);
        }
    }

};

module.exports = HotelsView;