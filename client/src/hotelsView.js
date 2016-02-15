var Mustache = require('mustache');

var HotelsView = function(packageOptions){
    this.packageOptions = packageOptions;
    // this.map = map;
    this.element = document.querySelector('#hotels');
};

HotelsView.prototype = {

    rebuildHotelOptions: function(){
        console.log('hotels view called');
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

        this.packageOptions.updateCurrentPackageHotel(key);
        this.rebuildHotelOptions(this.packageOptions);

        console.log('current', this.packageOptions.currentPackage);
    }

};

module.exports = HotelsView;